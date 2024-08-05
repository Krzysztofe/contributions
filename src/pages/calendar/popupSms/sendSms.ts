import { Helpers } from "./../../../utils/helpers";
import { URL_DEBT_MEMBERS } from "./../../../data/dataUrl";
import { LoadingTableCreator } from "../../../components/loadingsCreators/loadingTableCreator";

export class SendSms {
  #btnYesEl = document.getElementById("Tak") as HTMLButtonElement;

  constructor() {
    this.#sendSmsEvent();
  }

  #POSTOptions() {
    return {
      url: URL_DEBT_MEMBERS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
  }

  async #handleSendSms() {
    const loader = new LoadingTableCreator();
    loader.createLoading();
    const deletedMemberId = await Helpers.fetchData(this.#POSTOptions());
    loader.removeLoading();

  }

  #sendSmsEvent() {
    this.#btnYesEl?.addEventListener("click", this.#handleSendSms.bind(this));
  }
}
