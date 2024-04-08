import { headerHeight } from "../../data/dataNumbers";
import { ListCreator } from "../../utils/listCreator";
import { dataSearchFields } from "../settings/dataSearchFields";
import { InputCreator } from "../../utils/inputCreator";

export class HeaderCreator {
  #body: HTMLBodyElement | null;
  header: HTMLElement | null = null;
  #h1: HTMLHeadingElement | null = null;

  constructor(styles: string[]) {
    this.#body = document.querySelector("body");
    this.#createHeader(styles);
    this.#createH1();
    // this.#init(styles);
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
    this.header?.append(
      InputCreator.createInput(dataSearchFields, [
        "absolute",
        "top-50",
        "end-1/2",
        "translate-x-2/4",
      ])
    );
    new ListCreator("header", [
      { text: "Ustawienia", iconClass: "fa-gear" },
      { text: "Wyloguj", iconClass: "fa-user" },
    ]);
  }


}
