import { Helpers } from "../../../utils/helpers";
import { URL_DEBT_MEMBERS } from "../../../data/dataUrl";
import { LoadingTableCreator } from "../../../components/loadingsCreators/loadingTableCreator";

export class SendEmails {
  #popupInnerContainerEl = document.getElementById("popupInnerContainer");
  #headerEl = document.querySelector("[data-popup-header]");
  #btnsContainerEl = document.getElementById("btnsContainer");
  #btnYesEl = document.getElementById("Wyślij") as HTMLButtonElement;

  constructor() {
    this.#sendEmailsEvent();
  }

  #confirmationHeader() {
    this.#popupInnerContainerEl?.classList.add("max-w-96");
    if (!this.#headerEl) return;
    this.#headerEl.textContent = "E-maile zostały wysłane";
    this.#popupInnerContainerEl?.append(this.#headerEl);
  }

  #removeElements(...elements: (HTMLElement | null)[]) {
    elements.forEach(el => el?.remove());
  }

  #POSTOptions() {
    return {
      url: URL_DEBT_MEMBERS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      sendEmails: "sendEmails",
    };
  }

  async #handleSendEmails() {
    const loader = new LoadingTableCreator();

    loader.createLoading();

    const response = await Helpers.fetchData(this.#POSTOptions());

    if (!response) {
      this.#removeElements(
        this.#headerEl as HTMLElement,
        this.#btnsContainerEl,
        this.#popupInnerContainerEl
      );
      loader.removeLoading();
      return;
    }

    this.#removeElements(this.#headerEl as HTMLElement, this.#btnsContainerEl);
    loader.removeLoading();
    this.#confirmationHeader();
  }

  #sendEmailsEvent() {
    this.#btnYesEl?.addEventListener(
      "click",
      this.#handleSendEmails.bind(this)
    );
  }
}
