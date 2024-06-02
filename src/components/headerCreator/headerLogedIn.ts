import { FormCreator } from "../formCreator";
import { ListCreator } from "../listCreator";
import { dataSearchInput } from "./dataInputs";
import { dataNavList } from "./dataNavList";
import { HeaderCreator } from "./headerCreator";

export class HeaderLogedIn extends HeaderCreator {
  protected form = new FormCreator("header");
  #inputContainerEl: HTMLElement | null = null;
  #iconGlassEl: HTMLElement | null = null;

  constructor(styles: string[]) {
    super(styles);
    this.#createSearchContainer();
    new ListCreator("header div", dataNavList);
  }

  #createSearchContainer() {
    this.#inputContainerEl = document.createElement("div");
    this.#inputContainerEl.classList.add(
      "absolute",
      "top-50",
      "end-1/2",
      "translate-x-2/4",
      "bg-white"
    );

    this.#iconGlassEl = document.createElement("div");
    this.#iconGlassEl.classList.add(
      "fa",
      "fa-magnifying-glass",
      "mt-2",
      "ml-1",
      "absolute",
      "bottom-50"
    );
    this.#inputContainerEl.append(this.#iconGlassEl);

    dataSearchInput.forEach(input => {
      this.#inputContainerEl?.append(
        this.form.createInput(input, ["max-w-28", "sm:max-w-40", "pl-6"])
      );
    });

    this.headerWrapperEl?.append(this.#inputContainerEl);
  }
}
