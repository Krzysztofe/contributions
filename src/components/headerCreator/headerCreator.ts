import { headerHeight, wrapperWidth } from "../../data/dataNumbers";
wrapperWidth

export class HeaderCreator {
  #bodyEl = document.querySelector("body");
  #headerEl = document.createElement("header");
  protected headerWrapperEl = document.createElement("div");
  protected h1El = document.createElement("h1");

  constructor(styles: string[]) {
    this.#createHeader();
    this.#createHeaderWrapper(styles);
    this.#createH1();
  }

  #createHeader() {
    this.#headerEl.classList.add(
      headerHeight,
      "sticky",
      "top-0",
      "w-full",
      "bg-white",
      "z-50"
    );

    this.#bodyEl?.prepend(this.#headerEl);
  }

  #createHeaderWrapper(styles: string[]) {
    this.headerWrapperEl.classList.add(
      headerHeight,
      wrapperWidth,
      "mx-auto",
      "px-2",
      "md:px-4",
      "h-full",
      ...styles
    );
    this.#headerEl?.prepend(this.headerWrapperEl);
  }

  #createH1() {
    this.h1El.innerText = "OZZIP - Demo";
    this.h1El.classList.add();
    this.headerWrapperEl?.prepend(this.h1El);
  }
}
