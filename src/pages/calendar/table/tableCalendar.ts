import { LoadingTableCreator } from "../../../components/loadingsCreators/loadingTableCreator";
import { TableCreator } from "../../../components/tableCreator";
import { Helpers } from "../../../utils/helpers";
import { URL_CALENDAR } from "../../../data/dataUrl";
import { StatePrintedYear } from "../../../states/StatePrintedYear";
import { TableCalendarPrinter } from "./tableCalendarPrinter";
import { StateCalendar } from "../../../states/StateCalendar";
import { AutoLogoutCreator } from "../../../components/autoLogoutCreator";
import { PopupMonthDetails } from "../popupMonthDetails/popupMonthDetails";
import { StateAmount } from "../../../states/StateAmount";
import { iconChevron } from "../../../icons/iconChevron";

class SelectCreator {
  #thDivSelect = document.querySelectorAll(
    "[data = internalDiv]"
  )[1] as HTMLElement;
  #selectEl = document.createElement("select");
  #selectedYear: string | null = null;
  #loading = new LoadingTableCreator();

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
    const currentYear = Helpers.currentYear;

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
    StatePrintedYear.year = this.#selectedYear;
    const yearData = await Helpers.fetchData(this.#GETOptions());
    StateCalendar.setCalendar(yearData);
    document.getElementById("tableMembers")?.remove();
    new TableCalendarPrinter();
    const selectEl = document.querySelector(".select") as HTMLSelectElement;
    selectEl && (selectEl.value = this.#selectedYear);
    new PopupMonthDetails();
    new AutoLogoutCreator();
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
    this.#tdFullnameElems.forEach(fullnameEl => {
      fullnameEl.classList.add("pr-5");
      const areEmptyCollapses =
        fullnameEl.parentElement?.querySelectorAll("[data=emptyCollapse]")
          .length === 12;

      const icon = document.createElement("div");
      icon.innerHTML = iconChevron;
      const isIconVisible = areEmptyCollapses ? "invisible" : "visible";
      icon.classList.add(
        "absolute",
        "right-2",
        "top-3",
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

      collapseElems?.forEach(element => {
        element.classList.toggle("collapseOpen");
      });
    }
  }

  #collapseEvent() {
    this.#tbodyEl?.addEventListener("click", this.#handleCollapse.bind(this));
  }
}

export class TableCalendar extends TableCreator {
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
    this.#amountElems?.forEach(amountEl => {
      if (amountEl.textContent?.trim() === "0 zł") {
        amountEl?.parentElement &&
          amountEl?.parentElement.classList.add("bg-td_red");
      }
    });
  }

  tdJoinDateBgColor() {
    this.#tdElems = document.querySelectorAll("[data-join-date]");
    this.#tdElems.forEach(tdEl => {
      const joinDate = tdEl.getAttribute("data-join-date");
      const monthDetails = tdEl.getAttribute("data-month-details");
      const number = monthDetails && JSON.parse(monthDetails).monthNumber;
      const monthNumber = number.padStart(2, "0");
      const tdDate = `${StatePrintedYear.year}-${monthNumber}`;

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

  createTdSum(currentSumOfContrib: number, idx: number, tr: Element) {
    const tdNotActiveElemsAmount =
      tr.querySelectorAll("[data-not-active]").length *
        parseInt(StateAmount.amount) || 0;

    const sumToPay = currentSumOfContrib - tdNotActiveElemsAmount;

    const summaryAmount = Helpers.getTableSums()[idx] - sumToPay;
    const tdEl = document.createElement("td");
    tdEl.setAttribute("data", "sum");
    tdEl.setAttribute("data-sum-to-pay", sumToPay.toString());
    const textColor = summaryAmount < 0 ? "text-danger" : "text-dark";

    if (summaryAmount < 0) {
      tdEl.innerText = `${summaryAmount} zł`;
    } else if (summaryAmount > 0) {
      tdEl.innerText = `+${summaryAmount} zł`;
    } else {
      tdEl.innerText = `\u00A0 ${summaryAmount} zł`;
    }

    tdEl.classList.add(
      "whitespace-nowrap",
      "min-w-16",
      "align-top",
      "pt-2",
      textColor
    );
    tr.append(tdEl);
  }

  createTdSums() {
    this.#trElems = document.querySelectorAll("tbody tr");
    this.#trElems.forEach((tr, idx) => {
      const tdNotActiveElemsAmount =
        tr.querySelectorAll("[data-not-active]").length *
          parseInt(StateAmount.amount) || 0;

      let currentSumOfContrib = 0;

      if (StateAmount.amount) {
        if (StatePrintedYear.year > Helpers.currentYear) {
          currentSumOfContrib = 0 * parseInt(StateAmount.amount);
        } else if (tdNotActiveElemsAmount === 0) {
          currentSumOfContrib =
            Helpers.currentMonthInNumber * parseInt(StateAmount.amount);
        } else if (StatePrintedYear.year < Helpers.currentYear) {
          currentSumOfContrib = 12 * parseInt(StateAmount.amount);
        } else {
          currentSumOfContrib =
            Helpers.currentMonthInNumber * parseInt(StateAmount.amount);
        }
      }

      this.createTdSum(currentSumOfContrib, idx, tr);
    });
  }
}
