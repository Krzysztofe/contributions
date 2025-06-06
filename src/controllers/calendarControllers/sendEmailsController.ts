import { URL_DEBT_MEMBERS } from "../../config/apiUrl";
import { LoadingTableView } from "../../views/sharedViews/loadersViews/loadingTableView";
import { HelpersHttp } from "../../helpers/helpersHttp";
import { HelpersAuth } from "../../helpers/helpersAuth";

export class SendEmailsController {
  #btnYesEl = document.getElementById("Wyślij") as HTMLButtonElement;

  constructor() {
    this.#sendEmailsEvent();
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
    const loader = new LoadingTableView();

    loader.createLoading();

    await HelpersHttp.fetchData(this.#POSTOptions());
    const popupEl = document.getElementById("popupContainer");

    popupEl?.remove();
    loader.removeLoading();
  }

  #sendEmailsEvent() {
    HelpersAuth.isUserLogged();
    this.#btnYesEl?.addEventListener(
      "click",
      this.#handleSendEmails.bind(this)
    );
  }
}
