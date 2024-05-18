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

  async #handleSelect() {
    this.#loading.createLoading();
    // const selectedValue = (e.target as HTMLInputElement).value;
    const GETOptions = {
      url: URL_CALENDAR,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const database = await Helpers.fetchData(GETOptions);
    this.#loading.removeLoading();
    console.log("eee", database);
  }

  selectEvent() {
    this.#select?.addEventListener("input", this.#handleSelect.bind(this));
  }
}
