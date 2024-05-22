import { LoadingTableCreator } from "../../components/loadingsCreators/loadingTableCreator";
import { TableCreator } from "../../components/tableCreator";
import { Helpers } from "../../utils/helpers";
import { URL_CALENDAR } from "./../../data/dataUrl";

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
    this.#loading.removeLoading();
  }

  tdBgColor() {
    const amountElems = document.querySelectorAll("[data=amount]");
    // amountElems.forEach(elem => elem?.parentElement?.classList.add("bg-red-100"));

    // console.log("", amountElems);
    // const tdElems = document.querySelectorAll("td");
    // tdElems.forEach(elem => {
    //   const ff = elem.querySelector("div");

    //   if (ff?.textContent === "0 zł") {
    //     ff?.parentElement?.classList.add("bg-red-100");
    //   } else {
    //     ff?.parentElement?.classList.add("bg-green-100");
    //   }
    // });

    // console.log('',tdElems)
  }

  #handleCollapse(e: Event) {
    if ((e.target as HTMLElement)?.getAttribute("data") === "member") {
      const memberDetailsElems = document.querySelectorAll(
        `[data=memberDetailsPrint]`
      );
      memberDetailsElems.forEach(elem => {
        elem.classList.toggle("collapseOpen");
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
