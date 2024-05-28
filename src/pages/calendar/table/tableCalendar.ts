import { LoadingTableCreator } from "../../../components/loadingsCreators/loadingTableCreator";
import { TableCreator } from "../../../components/tableCreator";
import { Helpers } from "../../../utils/helpers";
import { URL_CALENDAR } from "../../../data/dataUrl";

export class TableCalendar extends TableCreator {
  #thDivSelect: HTMLElement | null = null;
  #select: HTMLSelectElement | null = null;
  #loading = new LoadingTableCreator();

  constructor(parentEl: string) {
    super(parentEl);
  }

  createSelect() {
    this.#thDivSelect = document.querySelectorAll(
      "[data = internalDiv]"
    )[1] as HTMLElement;

    const selectEl = document.createElement("select");
    selectEl.classList.add(
      "select",
      "select-xs",
      "border-0",
      "focus:outline-none",
      "min-w-24",
      "w-full",
      "bg-primary_dark"
    );
    selectEl.innerHTML = `<option>2024</option>
          <option>2025</option>
           <option>2026</option>
            <option>2027</option> 
          <option>2028</option>
          `;
    this.#thDivSelect?.append(selectEl);
    this.#select = selectEl;
    return selectEl;
  }

  async #handleSelect(e: Event) {
    const selectedYear = (e.target as HTMLInputElement).value;

    this.#loading.createLoading();
    const GETOptions = {
      url: `${URL_CALENDAR}${selectedYear}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const database = await Helpers.fetchData(GETOptions);
    console.log("", database);
    this.#loading.removeLoading();
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
        "fa-caret-down",
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
    const isIcon = target.classList.contains("fa-caret-down");
    const tdFullnameId = isIcon
      ? target.getAttribute("data-parent-id")
      : target.id;

    if (tdFullnameId) {
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

  collapseEvent() {
    const tbodyEl = document.querySelector("tbody");
    tbodyEl?.addEventListener("click", this.#handleCollapse.bind(this));
  }

  selectEvent() {
    this.#select?.addEventListener("input", this.#handleSelect.bind(this));
  }
}
