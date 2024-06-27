import { PopupCreator } from "../../../components/popupCreator";

export class PopupSmsCreator extends PopupCreator {
  #iconEl = document.querySelector(".fa-comment");

  constructor() {
    super();
    this.#printPopupEvent();
  }

  #handlePrintPopup() {
    this.createPopupContainetr();
  }

  #printPopupEvent() {
    this.#iconEl?.addEventListener("click", this.#handlePrintPopup.bind(this));
  }
}
