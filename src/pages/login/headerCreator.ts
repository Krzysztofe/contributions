import { headerHeight } from "../../data/dataNumbers";
import { ListCreator } from "../../utils/listCreator";
import { dataSearchFields } from "../settings/dataSearchFields";
import { FormCreator } from "../../utils/formCreator";

const headerForm = new FormCreator("header");

export class HeaderCreator {
  #body: HTMLBodyElement | null;
  header: HTMLElement | null = null;
  #h1: HTMLHeadingElement | null = null;

  constructor(styles: string[]) {
    this.#body = document.querySelector("body");
    this.#createHeader(styles);
    this.#createH1();
  }

  #createHeader(styles: string[]) {
    this.header = document.createElement("header");
    this.header.classList.add(
      headerHeight,
      "w-full",
      "bg-slate-200",
      ...styles
    );
    this.#body?.prepend(this.header);
  }
  #createH1() {
    this.#h1 = document.createElement("h1");
    this.#h1.innerText = "OZZIP";
    this.#h1.classList.add();
    this.header?.prepend(this.#h1);
  }
}

export class HeaderLogedIn extends HeaderCreator {
  constructor(styles: string[]) {
    super(styles);
    this.#init();
  }

  #init() {
    this.#createInputContainer();

    new ListCreator("header", [
      { text: "Ustawienia", iconClass: "fa-gear" },
      { text: "Wyloguj", iconClass: "fa-user" },
    ]);
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

    this.header?.append(inputContainer);
  }
}
