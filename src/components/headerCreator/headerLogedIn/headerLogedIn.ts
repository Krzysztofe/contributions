import { FormCreator } from "../../formCreator";
import { ListCreator } from "../../listCreator";
import { dataSearchInput } from "../dataInputs";
import { dataNavList } from "../dataNavList";
import { HeaderCreator } from "../headerCreator";
import { ListMenu } from "./listMenu";

export class HeaderLogedIn extends HeaderCreator {
  #navEl: HTMLElement | null = null;
  protected form = new FormCreator("header");
  #searchContainerEl: HTMLElement | null = null;
  #iconGlassEl: HTMLElement | null = null;

  constructor(styles: string[]) {
    super(styles);
    document.querySelector("h1")?.remove();
    this.#createSearchContainer();
    this.#creataNav();
  }

  #creataNav() {
    this.#navEl = document.createElement("nav");
    this.#navEl.classList.add("relative", "ml-auto");
    this.headerWrapperEl?.append(this.#navEl);
    new ListMenu({
      parentEl: "nav",
      elementsData: dataNavList,
    });
  }

  #createSearchContainer() {
    this.#searchContainerEl = document.createElement("div");
    this.#searchContainerEl.classList.add(
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
      "ml-3",
      "absolute",
      "bottom-50"
    );
    this.#searchContainerEl.append(this.#iconGlassEl);

    dataSearchInput.forEach(input => {
      this.#searchContainerEl?.append(
        this.form.createInput(input, ["w-28", "pl-10"])
      );
    });

    this.headerWrapperEl?.append(this.#searchContainerEl);
  }
}
