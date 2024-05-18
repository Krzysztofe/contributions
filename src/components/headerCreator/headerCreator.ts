import { headerHeight } from "../../data/dataNumbers";
import { FormCreator } from "../formsCreators/formCreator";
import { ListCreator } from "../listCreator";
import { dataNavList } from "./dataNavList";
import { dataSearchInput, dataAmountInput } from "./dataInputs";

export class HeaderCreator {
  #body = document.querySelector("body");
  #header: HTMLElement | null = null;
  protected headerWrapper: HTMLElement | null = null;
  #h1: HTMLHeadingElement | null = null;
  form = new FormCreator("header");

  constructor(styles: string[]) {
    this.#createHeader();
    this.#createHeaderWrapper(styles);
    this.#createH1();
  }

  #createHeader() {
    this.#header = document.createElement("header");
    this.#header.classList.add(
      headerHeight,
      "sticky",
      "top-0",
      "w-full",
      "bg-white",
      "z-50"
    );

    this.#body?.prepend(this.#header);
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
    this.#header?.prepend(this.headerWrapper);
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
    this.#createSearchContainer();
    new ListCreator("header div", dataNavList);
  }

  #createSearchContainer() {
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

    dataSearchInput.forEach(input => {
      inputContainer.append(
        this.form.createInput(input, ["max-w-28", "sm:max-w-40", "pl-6"])
      );
    });

    this.headerWrapper?.append(inputContainer);
  }
}

// export class HeaderCalendar extends HeaderLogedIn {
//   constructor(styles: string[]) {
//     super(styles);
//     this.createInputAmount();
//   }

//   #handleChangeInput(e: Event) {
//     console.log("", (e.target as HTMLInputElement).value);
//   }

//   createInputAmount() {
//     const navEl = document.querySelector("nav");

//     dataAmountInput.forEach(input => {
//       navEl?.append(
//         this.form.createInput(input, [
//           "absolute",
//           "w-24",
//           "-top-[2px]",
//           "lg:top-0",
//           "right-[100%]",
//           "hidden",
//           "md:block",
//         ])
//       );
//     });

//     const inputEl = document.getElementById("amount");
//     inputEl?.addEventListener("input", this.#handleChangeInput.bind(this));

//   }
// }
