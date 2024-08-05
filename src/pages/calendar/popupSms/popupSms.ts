import { URL_DEBT_MEMBERS } from "../../../data/dataUrl";
import { BtnsCreator } from "../../../components/btnsCreator";
import { LoadingPopupCreator } from "../../../components/loadingsCreators/loadingPopupCreator";
import { PopupCreator } from "../../../components/popupCreator";
import { Helpers } from "../../../utils/helpers";
import { SendSms } from "./sendSms";

export class PopupSms extends PopupCreator {
  #iconEl = document.querySelector("[data-icon-sms]");
  #hederEl = document.createElement("h3");
  #popupConainerEl: HTMLElement | null = null;
  #debtMembers: number | null = null;

  constructor() {
    super();
    this.#printPopupEvent();
  }

  #createSmsText() {
    if (!this.#debtMembers) return;

    const smsNumber = [...this.#debtMembers.toString()].at(-1);

    if (smsNumber === undefined) return;

    let textSms;

    if (+smsNumber === 1) {
      textSms = "SMS";
    }

    if (+smsNumber > 1 && +smsNumber < 5) {
      textSms = "SMS-y";
    }
    if (+smsNumber > 4) {
      textSms = "SMS-ów";
    }
    if (this.#debtMembers > 9 && +smsNumber > 1 && +smsNumber < 5) {
      textSms = "SMS-ów";
    }
    if (this.#debtMembers > 19) {
      textSms = "SMS-ów";
    }
    if (this.#debtMembers > 21 && +smsNumber > 1 && +smsNumber < 5) {
      textSms = "SMS-y";
    }
    return textSms;
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
      this.#hederEl.innerHTML = `Wysłać ${
        this.#debtMembers
      } ${this.#createSmsText()} z informacją o zaległościach do <br/> ${currentMonth} ?`;
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
    new SendSms();
  }

  #printPopupEvent() {
    this.#iconEl?.addEventListener("click", this.#handlePrintPopup.bind(this));
  }
}
