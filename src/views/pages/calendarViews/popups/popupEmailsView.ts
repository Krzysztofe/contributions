import { HelpersDate } from "../../../../helpers/helpersDate";
import { PopupView } from "../../../sharedViews/popupView";

export class PopupEmailsView extends PopupView {
  #hederEl = document.createElement("h3");
  #popupConainerEl: HTMLElement | null = null;
  #debtMembers: number | null = null;

  constructor(debtMembers: number | null) {
    super();
    this.#debtMembers = debtMembers;
    this.#createHeader();
  }

  #createEmailsText() {
    if (!this.#debtMembers) return;

    const lastDigit = this.#debtMembers % 10;
    const lastTwoDigits = this.#debtMembers % 100;

    let textEmails;

    if (lastTwoDigits > 10 && lastTwoDigits < 20) {
      textEmails = "e-maili";
    } else if (lastDigit === 1) {
      textEmails = "mail";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      textEmails = "e-maile";
    } else {
      textEmails = "e-maili";
    }

    return textEmails;
  }

  #createHeader() {
    this.createPopupContainetr();
    this.#popupConainerEl = document.getElementById("popupInnerContainer");
    this.#hederEl.setAttribute("data-popup-header", "");

    this.#hederEl.classList.add("font-semibold", "text-center");
    const currentMonth = HelpersDate.getCurrentMonth()
      .split("-")
      .reverse()
      .join(".");

    if (this.#debtMembers === 0) {
      this.#hederEl.innerHTML = "Brak zaległości";
    } else {
      this.#hederEl.innerHTML = `Wyślij ${
        this.#debtMembers
      } ${this.#createEmailsText()}  <br/> z informacją o zaległościach do ${currentMonth}`;
    }

    this.#popupConainerEl?.append(this.#hederEl);
  }
}
