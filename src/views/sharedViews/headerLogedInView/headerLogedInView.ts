import { navListItems } from "./navListItems";
import { HeaderCreatorView } from "../headerView";
import { ListMenuView } from "../listMenuView";
import { searchInputField } from "./searchInputField";
import { iconGlass } from "../../../icons/iconGlass";
import { FormView } from "../formView";

export class HeaderLogedInView extends HeaderCreatorView {
  #navEl: HTMLElement | null = null;
  protected form = new FormView("header");
  #searchContainerEl: HTMLElement | null = null;
  #iconGlassEl: HTMLElement | null = null;

  constructor(styles: string[]) {
    super(styles);
    document.querySelector("h1")?.remove();
    this.#creataNav();
  }

  #creataNav() {
    this.#navEl = document.createElement("nav");
    this.#navEl.classList.add("relative", "ml-auto");
    this.headerWrapperEl?.append(this.#navEl);
    this.#createSearchContainer();
    new ListMenuView({
      parentEl: "nav",
      elementsData: navListItems,
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
    this.#iconGlassEl.innerHTML = iconGlass;
    this.#iconGlassEl.classList.add(
      "fill-dark",
      "w-4",
      "mt-2",
      "ml-3",
      "absolute",
      "bottom-50"
    );
    this.#searchContainerEl.append(this.#iconGlassEl);

    searchInputField.forEach((input) => {
      this.#searchContainerEl?.append(
        this.form.createInput(input, ["w-28", "pl-10"])
      );
    });

    this.headerWrapperEl?.append(this.#searchContainerEl);
  }
}
