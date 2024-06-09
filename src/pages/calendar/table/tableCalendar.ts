import { LoadingTableCreator } from "../../../components/loadingsCreators/loadingTableCreator";
import { TableCreator } from "../../../components/tableCreator";
import { Helpers } from "../../../utils/helpers";
import { URL_CALENDAR, URL_MONTH_DETAILS } from "../../../data/dataUrl";
import { StateYear } from "../states/StateYear";
import { TableCalendarPrinter } from "./tableCalendarPrinter";
import { StateCalendar } from "../states/StateCalendar";
import { PopupTable } from "../popup/popupTable";
import { AutoLogoutCreator } from "../../../components/autoLogoutCreator";
import { StateFillMode } from "../states/stateFillMode";
import { PopupSubmit } from "../popup/popupSubmit";
import { LoadingTdCreator } from "../../../components/loadingsCreators/loadingTdCreator";

class SelectCreator {
  #thDivSelect: HTMLElement | null = null;
  #selectEl = document.createElement("select");
  #selectedYear: string | null = null;
  #loading = new LoadingTableCreator();

  constructor() {
    this.#createSelect();
    this.#selectEvent();
  }

  #createSelect() {
    this.#thDivSelect = document.querySelectorAll(
      "[data = internalDiv]"
    )[1] as HTMLElement;

    this.#selectEl.classList.add(
      "select",
      "select-xs",
      "border-0",
      "focus:outline-none",
      "min-w-24",
      "w-full",
      "bg-primary_dark"
    );
    this.#selectEl.innerHTML = `<option>2024</option>
          <option>2025</option>
           <option>2026</option>
            <option>2027</option> 
          <option>2028</option>
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
    StateYear.year = this.#selectedYear;
    this.#loading.createLoading();
    const calendalFromYear = await Helpers.fetchData(this.#GETOptions());
    StateCalendar.setCalendar(calendalFromYear);
    document.getElementById("tableMembers")?.remove();
    new TableCalendarPrinter();
    const selectEl = document.querySelector(".select") as HTMLSelectElement;
    selectEl && (selectEl.value = this.#selectedYear);
    new PopupTable();
    new AutoLogoutCreator();
    this.#loading.removeLoading();
  }
  #selectEvent() {
    this.#selectEl?.addEventListener("input", this.#handleSelect.bind(this));
  }
}

export class TableCalendar extends TableCreator {
  #eventTarget: HTMLElement | null = null;
  #tdLoader = new LoadingTdCreator();

  constructor(parentEl: string) {
    super(parentEl);
  }

  createSelect() {
    new SelectCreator();
  }

  tdElemsBgColor() {
    const amountElems = document.querySelectorAll("[data=amount]");
    amountElems.forEach(amountEl => {
      if (amountEl.textContent?.trim() === "0 zł") {
        amountEl?.parentElement &&
          amountEl?.parentElement.classList.add("bg-td_red");
      }
    });
  }

  tdJoinDateBgColor() {
    const tdElems = document.querySelectorAll("[data-join-date]");
    tdElems.forEach(tdEl => {
      const joinDate = tdEl.getAttribute("data-join-date");
      const monthDetails = tdEl.getAttribute("data-month-details");
      const number = monthDetails && JSON.parse(monthDetails).monthNumber;
      const monthNumber = number < 10 ? "0" + number : number;
      const tdDate = `${StateYear.year}-${monthNumber}`;

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

  createArrowCollapse() {
    const tdFullnameElems = document.querySelectorAll("[data=member]");

    tdFullnameElems.forEach(fullnameEl => {
      const areEmptyCollapses =
        fullnameEl.parentElement?.querySelectorAll("[data=emptyCollapse]")
          .length === 12;

      const icon = document.createElement("i");
      const isIconVisible = areEmptyCollapses ? "invisible" : "visible";
      icon.classList.add(
        "fa-solid",
        "fa-chevron-down",
        "text-[0.5rem]",
        "mr-1",
        "transition",
        "duration-300",
        isIconVisible
      );
      icon.setAttribute("data-parent-id", fullnameEl.id);
      fullnameEl.prepend(icon);
    });
  }

  #handleCollapse(e: Event) {
    const target = e.target as HTMLElement;
    const isIcon = target.classList.contains("fa-chevron-down");

    const tdFullnameId = isIcon
      ? target.getAttribute("data-parent-id")
      : target.id;
    const tdTagEl = target.tagName;

    if (tdFullnameId && (tdTagEl === "TD" || tdTagEl === "I")) {
      const iconEL = document.getElementById(tdFullnameId)
        ?.firstElementChild as HTMLElement;

      iconEL?.classList.toggle("rotate-180");

      const collapseElems = document
        .getElementById(tdFullnameId)
        ?.parentElement?.querySelectorAll("[data=memberDetailsPrint]");

      collapseElems?.forEach(element => {
        element.classList.toggle("collapseOpen");
      });
    }
  }

  #POSTOptions() {
    return {
      url: URL_MONTH_DETAILS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        // client_id: this.#memberId || "",
        // year: StateYear.year || "",
        // month: this.#monthNumber || "",
        // amount: this.#formValues?.amount || "",
        // pay_date: this.#formValues?.pay_date || "",
        // comment: this.#formValues?.comment || "",
      },
    };
  }

  async #handlePOSTMonth(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    const isNestedInTd = Helpers.isNestedEl("td", this.#eventTarget);
    const dataAtribute = this.#eventTarget?.getAttribute("data");
    const isIconArrow =
      this.#eventTarget.classList.value.includes("fa-chevron-down");
    const isDataNoActive = this.#eventTarget?.getAttribute("data-not-active");

    if (
      StateFillMode.isFast &&
      dataAtribute !== "member" &&
      dataAtribute !== "idx" &&
      !isDataNoActive &&
      !isIconArrow &&
      isNestedInTd
    ) {
      document
        .querySelectorAll("[data=memberDetailsPrint]")
        .forEach(element => {
          element.classList.remove("collapseOpen");
        });

      document.querySelectorAll(".fa-chevron-down").forEach(icon => {
        icon.classList.remove("rotate-180");
      });
      const monthDetailsString =
        this.#eventTarget &&
        this.#eventTarget?.getAttribute("data-month-details");
      const monthDetails = monthDetailsString && JSON.parse(monthDetailsString);

      this.#tdLoader.createSpiner();
      await Helpers.fetchData(this.#POSTOptions());
      this.#tdLoader.removeSpinner();
    }
  }

  collapseEvent() {
    const tbodyEl = document.querySelector("tbody");
    tbodyEl?.addEventListener("click", this.#handleCollapse.bind(this));
  }

  // selectEvent() {
  //   this.#selectEl?.addEventListener("input", this.#handleSelect.bind(this));
  // }

  POSTMonthEvent() {
    const tableBodyEl = document.querySelector("tbody");
    tableBodyEl?.addEventListener("click", this.#handlePOSTMonth.bind(this));
  }
}
