import { URL_DEBT_MEMBERS } from "../../../config/apiUrl";
import { BtnsView } from "../../../views/sharedViews/btnsView";
import { LoadingPopupView } from "../../../views/pages/calendarViews/loaders/loadingPopupView";
import { Helpers } from "../../../utils/helpers";
import { SendEmailsController } from "../sendEmailsController";
import { PopupEmailsView } from "../../../views/pages/calendarViews/popups/popupEmailsView";

export class PopupEmailsController {
  #iconEl = document.querySelector("[data-icon-email]");
  #hederEl = document.createElement("h3");
  #debtMembers: number | null = null;

  constructor() {
    this.#printPopupEvent();
  }

  GETCalendarOptions = {
    url: URL_DEBT_MEMBERS,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  async #handlePrintPopup() {
    const loader = new LoadingPopupView("#popupInnerContainer");
    loader.createSpinner();
    this.#hederEl.remove();
    document.getElementById("btnsContainer")?.remove();
    const calendarDatabase = await Helpers.fetchData(this.GETCalendarOptions);
    this.#debtMembers = calendarDatabase["debts-members"];
    loader.removeLoading();

    new PopupEmailsView(this.#debtMembers);
    this.#debtMembers &&
      this.#debtMembers > 0 &&
      new BtnsView("#popupInnerContainer", "Wyślij");
    new SendEmailsController();
  }

  #printPopupEvent() {
    Helpers.isUserLoged();
    this.#iconEl?.addEventListener("click", this.#handlePrintPopup.bind(this));
  }
}
