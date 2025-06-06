import { LoadingTableView } from "../../../sharedViews/loadersViews/loadingTableView";
import { TableView } from "../../../sharedViews/tableView";
import { HelpersBalance } from "../../../../helpers/helpersBalance";
import { URL_CALENDAR } from "../../../../config/apiUrl";
import { PrintedYearModel } from "../../../../models/calendarModels/printedYearModel";
import { TableCalendarBuilder } from "./tableCalendarBuilder";
import { CalendarModel } from "../../../../models/calendarModels/calendarModel";
import { AutoLogout } from "../../../../helpers/autoLogout";
import { PopupMonthDetailsController } from "../../../../controllers/calendarControllers/popups/popupMonthDetailsController";
import { AmountModel } from "../../../../models/calendarModels/amountModel";
import { iconChevron } from "../../../../icons/iconChevron";
import { HelpersHttp } from "../../../../helpers/helpersHttp";
import { HelpersDate } from "../../../../helpers/helpersDate";
import { HelpersCalendar } from "../../../../helpers/helpersCalendar";

class SelectCreator {
  #thDivSelect = document.querySelectorAll(
    "[data = internalDiv]"
  )[1] as HTMLElement;
  #selectEl = document.createElement("select");
  #selectedYear: string | null = null;
  #loading = new LoadingTableView();

  constructor() {
    this.#createSelect();
    this.#selectEvent();
  }

  #createSelect() {
    this.#selectEl.classList.add(
      "select",
      "select-xs",
      "border-0",
      "focus:outline-none",
      "w-full",
      "bg-primary_dark"
    );
    const currentYear = HelpersDate.currentYear;

    this.#selectEl.innerHTML = `
       <option ${currentYear === "2024" ? "selected" : ""}>2024</option>
       <option ${currentYear === "2025" ? "selected" : ""}>2025</option>
       <option ${currentYear === "2026" ? "selected" : ""}>2026</option>
       <option ${currentYear === "2027" ? "selected" : ""}>2027</option>
       <option ${currentYear === "2028" ? "selected" : ""}>2028</option>
          `;
    this.#thDivSelect?.append(this.#selectEl);
  }

  #GETOptions() {
    return {
      url: `${URL_CALENDAR}${this.#selectedYear}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
  }

  async #handleSelect(e: Event) {
    this.#selectedYear = (e.target as HTMLInputElement).value;
    this.#loading.createLoading();
    PrintedYearModel.year = this.#selectedYear;
    const yearData = await HelpersHttp.fetchData(this.#GETOptions());
    CalendarModel.setCalendar(yearData);
    document.getElementById("tableMembers")?.remove();
    new TableCalendarBuilder();
    const selectEl = document.querySelector(".select") as HTMLSelectElement;
    selectEl && (selectEl.value = this.#selectedYear);
    new PopupMonthDetailsController();
    new AutoLogout();
    this.#loading.removeLoading();
  }
  #selectEvent() {
    this.#selectEl?.addEventListener("input", this.#handleSelect.bind(this));
  }
}

class CollapseCreator {
  #tdFullnameElems = document.querySelectorAll("[data=member]");
  #tbodyEl = document.querySelector("tbody");
  constructor() {
    this.#createArrowInCollapse();
    this.#collapseEvent();
  }

  #createArrowInCollapse() {
    this.#tdFullnameElems.forEach((fullnameEl) => {
      fullnameEl.classList.add("pr-5");
      const areEmptyCollapses =
        fullnameEl.parentElement?.querySelectorAll("[data=emptyCollapse]")
          .length === 12;

      const icon = document.createElement("div");
      icon.innerHTML = iconChevron;
      icon.classList.add("fill-grey_primary");
      const isIconVisible = areEmptyCollapses ? "invisible" : "visible";
      icon.classList.add(
        "absolute",
        "right-2",
        "top-2",
        "w-2",
        "text-[0.5rem]",
        "ml-auto",
        "transition",
        "duration-300",
        isIconVisible
      );
      icon.setAttribute("data-parent-id", fullnameEl.id);
      icon.querySelector("svg")?.setAttribute("data-parent-id", fullnameEl.id);
      icon.querySelector("path")?.setAttribute("data-parent-id", fullnameEl.id);
      fullnameEl.append(icon);
    });
  }

  #handleCollapse(e: Event) {
    const target = e.target as HTMLElement;
    const isIcon = target.matches("data-icon-chevron");

    const tdFullnameId = isIcon
      ? target.getAttribute("data-parent-id")
      : target.id;
    const tdTagEl = target.tagName;
    if (
      tdFullnameId &&
      (tdTagEl === "TD" ||
        tdTagEl === "DIV" ||
        tdTagEl === "svg" ||
        tdTagEl === "path")
    ) {
      const iconEl = document.getElementById(tdFullnameId)
        ?.firstElementChild as HTMLElement;

      iconEl?.classList.toggle("rotate-180");

      const collapseElems = document
        .getElementById(tdFullnameId)
        ?.parentElement?.querySelectorAll("[data=memberDetailsPrint]");

      collapseElems?.forEach((element) => {
        element.classList.toggle("collapseOpen");
      });
    }
  }

  #collapseEvent() {
    this.#tbodyEl?.addEventListener("click", this.#handleCollapse.bind(this));
  }
}

export class TableCalendarView extends TableView {
  #trElems: NodeListOf<Element> | null = null;
  #amountElems: NodeListOf<Element> | null = null;
  #tdElems: NodeListOf<Element> | null = null;

  constructor(parentEl: string) {
    super(parentEl);
    this.tdElemsBgColor();
    this.tdJoinDateBgColor();
  }

  createSelect() {
    new SelectCreator();
  }
  createArrowCollapse() {
    new CollapseCreator();
  }

  tdElemsBgColor() {
    this.#amountElems = document.querySelectorAll("[data=amount]");
    this.#amountElems?.forEach((amountEl) => {
      if (amountEl.textContent?.trim() === "0 zł") {
        amountEl?.parentElement &&
          amountEl?.parentElement.classList.add("bg-td_red");
      }
    });
  }

  tdJoinDateBgColor() {
    this.#tdElems = document.querySelectorAll("[data-join-date]");
    this.#tdElems.forEach((tdEl) => {
      const joinDate = tdEl.getAttribute("data-join-date");
      const monthDetails = tdEl.getAttribute("data-month-details");
      const number = monthDetails && JSON.parse(monthDetails).monthNumber;
      const monthNumber = number.padStart(2, "0");
      const tdDate = `${PrintedYearModel.year}-${monthNumber}`;

      const joinDateCompare = new Date(joinDate + "-01");
      const tdDateCompare = new Date(tdDate + "-01");

      if (joinDateCompare > tdDateCompare) {
        tdEl.classList.add("bg-primary", "cursor-auto");
        tdEl.classList.remove("bg-td_red", "cursor-pointer");
        tdEl.innerHTML = "";
        tdEl.setAttribute("data", "emptyCollapse");
        tdEl.setAttribute("data-not-active", "true");
      }
    });
  }

  #createTdBalance(balance: number, trEl: Element, dataAtrib: string) {
    const tdEl = document.createElement("td") as HTMLElement;
    tdEl.setAttribute("data", "sum");
    tdEl.setAttribute(dataAtrib, balance.toString());

    tdEl.classList.add(
      "whitespace-nowrap",
      "min-w-16",
      "align-top",
      "pt-2",
      "border",
      "border-primary_dark"
    );
    trEl.append(tdEl);
    HelpersBalance.printNewBalanceText(balance, tdEl);
  }

  createTdYearBalances() {
    this.#trElems = document.querySelectorAll("tbody tr");
    this.#trElems.forEach((trEl, idx) => {
      const contribsNotToPay =
        trEl.querySelectorAll("[data-not-active]").length *
          parseInt(AmountModel.amount) || 0;
      const sumToPay =
        HelpersCalendar.getCurrentYearContribsToPay() - contribsNotToPay;
      const yearContribsBalance =
        HelpersCalendar.getTableSums()[idx] - sumToPay;

      this.#createTdBalance(yearContribsBalance, trEl, "data-sum-to-pay");
    });
  }

  createTdTotalBalances() {
    this.#trElems?.forEach((trEl, idx) => {
      const joinDate = trEl
        .querySelector("[data-join-date]")
        ?.getAttribute("data-join-date");

      if (!joinDate) return;
      const [joinYear, joinMonth] = joinDate?.split("-");

      const allMonthsToPay =
        parseInt(HelpersDate.currentYear) * 12 +
        HelpersDate.currentMonthInNumber -
        (parseInt(joinYear) * 12 + parseInt(joinMonth)) +
        1;

      const prevTotalContribs = CalendarModel.sortedCalendar[idx].payedContribs;
      const totalContribsToPay = allMonthsToPay * parseInt(AmountModel.amount);
      const totalContribsBalance = prevTotalContribs - totalContribsToPay;

      this.#createTdBalance(
        totalContribsBalance,
        trEl,
        "data-total-sum-to-pay"
      );
    });
  }
}
