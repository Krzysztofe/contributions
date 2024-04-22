import { headerHeight } from "../../data/dataNumbers";
import { ListCreator } from "../listCreator";
import { dataSearchFields } from "../../pages/settings/dataSearchFields";
import { FormCreator } from "../formCreator";
import { dataNavList } from "./dataNavList";

const headerForm = new FormCreator("header");

export class HeaderCreator {
  #body: HTMLBodyElement | null;
  header: HTMLElement | null = null;
  headerWrapper: HTMLElement | null = null;
  #h1: HTMLHeadingElement | null = null;

  constructor(styles: string[]) {
    this.#body = document.querySelector("body");
    this.#createHeader();
    this.#createHeaderWrapper(styles);
    this.#createH1();
  }

  #createHeader() {
    this.header = document.createElement("header");
    this.header.classList.add(
      headerHeight,
      "fixed",
      "w-full",
      "bg-white",
      "z-50"
    );
    const headerBlockContainer = document.createElement("header");
    headerBlockContainer.classList.add(headerHeight);

    this.#body?.prepend(headerBlockContainer);
    this.#body?.prepend(this.header);
  }
  #createHeaderWrapper(styles: string[]) {
    this.headerWrapper = document.createElement("div");
    this.headerWrapper.classList.add(
      headerHeight,
      "max-w-[1350px]",
      "mx-auto",
      "px-2",
      "md:px-4",
      "h-full",
      ...styles
    );
    this.header?.prepend(this.headerWrapper);
  }

  #createH1() {
    this.#h1 = document.createElement("h1");
    this.#h1.innerText = "OZZIP";
    this.#h1.classList.add();
    this.headerWrapper?.prepend(this.#h1);
  }
}

export class HeaderLogedIn extends HeaderCreator {
  constructor(styles: string[]) {
    super(styles);
    this.#init();
  }

  #init() {
    this.#createInputContainer();
    new ListCreator("header div", dataNavList);
  }

  #createInputContainer() {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add(
      "absolute",
      "top-50",
      "end-1/2",
      "translate-x-2/4",
      "bg-white"
    );

    const icon = document.createElement("div");
    icon.classList.add(
      "fa",
      "fa-magnifying-glass",
      "mt-2",
      "ml-1",
      "absolute",
      "bottom-50"
    );
    inputContainer.append(icon);

    dataSearchFields.forEach(field => {
      inputContainer.append(
        headerForm.createInput(field, ["max-w-28", "sm:max-w-40", "pl-6"])
      );
    });

    this.headerWrapper?.append(inputContainer);
  }
}
