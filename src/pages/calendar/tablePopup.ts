import { StateAmount } from "./StateAmount";
import { FormCreator } from "../../components/formsCreators/formCreator";

export class TablePopup {
  #bodyEl = document.querySelector("body");
  #popupContainer: HTMLElement | null = null;
  //   #form = new FormCreator("popupContainer");
  constructor() {
    this.#printPopupEvent();
  }

  #createForm() {
    console.log("ee");
    const form = new FormCreator("popupContainer");

    form.createForm({
      formId: "popupForm",
      styles: ["flex", "flex-col", "sm:bg-white", "sm:border", "px-16", "py-8"],
    });
    form.createBtn({
      innerText: "Zaloguj się",
      styles: ["text-center", "w-full", "py-1", "m-auto"],
    });
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
    if (((e.target as HTMLElement).classList.value = "bg-black_opacity")) {
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
