import { StateAmount } from "../StateAmount";
import { FormCreator } from "../../../components/formsCreators/formCreator";
import { dataPopupFields } from "./dataPopupFields";
import { PopupSubmit } from "./popupSubmit";

export class TablePopup {
  #bodyEl = document.querySelector("body");
  #popupContainer: HTMLElement | null = null;
  constructor() {
    this.#printPopupEvent();
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
        "rounded-sm",
        "bg-white",
      ],
    });
    form.createFields({ inputsData: dataPopupFields });
    form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
    });

    new PopupSubmit();
  }

  #createPopup(e: Event) {
    const btnEl = e.target as HTMLElement;
    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";
    popupContainer && (popupContainer.innerText = StateAmount.amount);
    popupContainer.classList.add(
      "fixed",
      "top-0",
      "w-screen",
      "h-screen",
      "bg-black_opacity",
      "grid",
      "place-content-center",
      "z-50"
    );
    this.#bodyEl?.append(popupContainer);
    this.#popupContainer = popupContainer;
    this.#createForm();
    this.#removePopupEvent();
  }

  #removePopup(e: Event) {
    if (
      (e.target as HTMLElement)?.classList.value.includes("bg-black_opacity")
    ) {
      this.#popupContainer?.remove();
      e.stopPropagation();
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
