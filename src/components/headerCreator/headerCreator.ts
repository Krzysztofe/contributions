import { headerHeight } from "../../data/dataNumbers";

export class HeaderCreator {
  #bodyEl = document.querySelector("body");
  #headerEl: HTMLElement | null = null;
  protected headerWrapperEl: HTMLElement | null = null;
  protected h1El: HTMLHeadingElement | null = null;

  constructor(styles: string[]) {
    this.#createHeader();
    this.#createHeaderWrapper(styles);
    this.#createH1();
  }

  #createHeader() {
    this.#headerEl = document.createElement("header");
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
    this.headerWrapperEl = document.createElement("div");
    this.headerWrapperEl.classList.add(
      headerHeight,
      "max-w-[1350px]",
      "mx-auto",
      "px-2",
      "md:px-4",
      "h-full",
      ...styles
    );
    this.#headerEl?.prepend(this.headerWrapperEl);
  }

  #createH1() {
    this.h1El = document.createElement("h1");
    this.h1El.innerText = "OZZIP";
    this.h1El.classList.add();
    this.headerWrapperEl?.prepend(this.h1El);
  }
}
