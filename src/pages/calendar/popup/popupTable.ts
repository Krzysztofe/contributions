import { StateAmount } from "../StateAmount";
import { FormCreator } from "../../../components/formsCreators/formCreator";
import { dataPopupFields } from "./dataPopupFields";
import { PopupSubmit } from "./popupSubmit";
import { Helpers } from "../../../utils/helpers";

export class PopupTable {
  #bodyEl = document.querySelector("body");
  #popupContainer: HTMLElement | null = null;
  #eventTarget: HTMLElement | null = null;

  constructor() {
    this.#printPopupEvent();
  }

  #createIconXmark() {
    const xmarkEL = document.createElement("i");
    xmarkEL.classList.add(
      "fa-solid",
      "fa-xmark",
      "absolute",
      "top-0",
      "right-2",
      "text-2xl",
      "cursor-pointer"
    );
    document.querySelector("form")?.prepend(xmarkEL);
  }


  #createHeader() {
    const monthDetails =
      this.#eventTarget &&
      this.#eventTarget?.getAttribute("data-mnth-details")?.split("/");

    const memberFullname = monthDetails && monthDetails[1].replace("-", " ");
    const monthhName = monthDetails &&  Helpers.translateMonth(monthDetails[2]) ;

    const hederEl = document.createElement("h3");
    memberFullname &&
      (hederEl.innerHTML = `
    <div class = "flex justify-between">
         <div>${memberFullname}</div>
         <div>${monthhName}</div>
    </div>`);
    hederEl.classList.add("mb-4");
    this.#popupContainer?.append(hederEl);
    document.getElementById("popupForm")?.prepend(hederEl);
  }

  #createForm() {
    const form = new FormCreator("popupContainer");
    form.createForm({
      formId: "popupForm",
      styles: [
        "flex",
        "flex-col",
        "sm:bg-white",
        "sm:border",
        "px-16",
        "py-8",
        "max-w-96",
        "m-auto",
        "rounded-sm",
        "bg-white",
        "relative",
        "mt-14",
      ],
    });
    form.createFields({ inputsData: dataPopupFields, inputStyles: ["pr-0"] });

    const inputAmountEl = document.getElementById("amount") as HTMLInputElement;
    inputAmountEl.value = StateAmount.amount;

    form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
    });
    this.#createHeader();
    this.#createIconXmark();
    new PopupSubmit();
  }

  isNestedInTd(elem: HTMLElement | null) {
    let currentElement = elem;

    while (currentElement) {
      if (currentElement.tagName.toLowerCase() === "td") {
        return true;
      }
      currentElement = currentElement.parentElement;
    }

    return false;
  }

  #createPopup(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    // console.log("eee", this.#eventTarget);

    const isNestedInTd = this.isNestedInTd(this.#eventTarget);

    const dataAtribute = this.#eventTarget?.getAttribute("data");

    if (dataAtribute !== "member" && isNestedInTd) {
      const popupContainer = document.createElement("div");
      popupContainer.id = "popupContainer";
      popupContainer.classList.add(
        "fixed",
        "top-0",
        "w-screen",
        "h-screen",
        "bg-black_opacity",
        "overflow-y-scroll",
        "z-50"
      );
      this.#bodyEl?.append(popupContainer);
      this.#popupContainer = popupContainer;
      this.#createForm();
      this.#removePopupEvent();
    }
  }

  #removePopup(e: Event) {
    const eventTarget = e.target as HTMLElement;

    if (
      eventTarget?.classList.value.includes("bg-black_opacity") ||
      eventTarget?.classList.value.includes("fa-xmark")
    ) {
      this.#popupContainer?.remove();
    }
  }

  #printPopupEvent() {
    const tableBodyEl = document.querySelector("tbody");
    tableBodyEl?.addEventListener("click", this.#createPopup.bind(this));
  }

  #removePopupEvent() {
    this.#popupContainer?.addEventListener(
      "click",
      this.#removePopup.bind(this)
    );
  }
}
