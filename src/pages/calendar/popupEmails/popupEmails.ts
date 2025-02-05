import { URL_DEBT_MEMBERS } from "../../../data/dataUrl";
import { BtnsCreator } from "../../../components/btnsCreator";
import { LoadingPopupCreator } from "../../../components/loadingsCreators/loadingPopupCreator";
import { PopupCreator } from "../../../components/popupCreator";
import { Helpers } from "../../../utils/helpers";
import { SendEmails } from "./sendEmails";

export class PopupEmails extends PopupCreator {
  #iconEl = document.querySelector("[data-icon-email]");
  #hederEl = document.createElement("h3");
  #popupConainerEl: HTMLElement | null = null;
  #debtMembers: number | null = null;

  constructor() {
    super();
    this.#printPopupEvent();
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
    this.#popupConainerEl = document.getElementById("popupInnerContainer");
    this.#hederEl.setAttribute("data-popup-header", "");

    this.#hederEl.classList.add("font-semibold", "text-center");
    const currentMonth = Helpers.getCurrentMonth()
      .split("-")
      .reverse()
      .join(".");

    if (this.#debtMembers === 0) {
      this.#hederEl.innerHTML = "Brak zaległości";
    } else {
      this.#hederEl.innerHTML = `Czy wysłać ${
        this.#debtMembers
      } ${this.#createEmailsText()} z informacją o zaległościach do <br/> ${currentMonth} ?`;
    }

    this.#popupConainerEl?.append(this.#hederEl);
  }
  GETCalendarOptions = {
    url: URL_DEBT_MEMBERS,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  async #handlePrintPopup() {
    this.createPopupContainetr();
    this.#hederEl.remove();

    const popupInnerContainerEl = document.querySelector(
      "#popupInnerContainer"
    );
    popupInnerContainerEl?.classList.add(
      "min-h-64",
      "flex",
      "flex-col",
      "justify-center",
      "items-center"
    );
    const loader = new LoadingPopupCreator("#popupInnerContainer");
    loader.createSpinner();
    this.#hederEl.remove();
    document.getElementById("btnsContainer")?.remove();
    const calendarDatabase = await Helpers.fetchData(this.GETCalendarOptions);
    this.#debtMembers = calendarDatabase["debts-members"];
    loader.removeLoading();

    this.#createHeader();
    this.#debtMembers &&
      this.#debtMembers > 0 &&
      new BtnsCreator("#popupInnerContainer");
    new SendEmails();
  }

  #printPopupEvent() {
    this.#iconEl?.addEventListener("click", this.#handlePrintPopup.bind(this));
  }
}
