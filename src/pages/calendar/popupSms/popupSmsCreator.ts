import { BtnsCreator } from "../../../components/btnsCreator";
import { PopupCreator } from "../../../components/popupCreator";

export class PopupSmsCreator extends PopupCreator {
  #iconEl = document.querySelector(".fa-comment");
  #hederEl = document.createElement("h3");
  #popupConainerEl: HTMLElement | null = null;
  constructor() {
    super();
    this.#printPopupEvent();
  }

  #createHeader() {
    this.#popupConainerEl = document.getElementById("popupInnerContainer");
    this.#hederEl.classList.add("font-semibold", "text-center");
    this.#hederEl.innerText = `Wysłać sms?`;
    this.#popupConainerEl?.append(this.#hederEl);
  }

  #handlePrintPopup() {
    this.createPopupContainetr();
    document.querySelector(".fa-xmark")?.remove()
    this.#createHeader();
    new BtnsCreator("#popupInnerContainer")
  }

  #printPopupEvent() {
    this.#iconEl?.addEventListener("click", this.#handlePrintPopup.bind(this));
  }
}
