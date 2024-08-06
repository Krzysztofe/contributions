import { Helpers } from "./../../../utils/helpers";
import { URL_DEBT_MEMBERS } from "./../../../data/dataUrl";
import { LoadingTableCreator } from "../../../components/loadingsCreators/loadingTableCreator";

export class SendSms {
  #popupInnerContainerEl = document.getElementById("popupInnerContainer");
  #headerEl = document.querySelector("[data-popup-header]");
  #btnsContainerEl = document.getElementById("btnsContainer");
  #btnYesEl = document.getElementById("Tak") as HTMLButtonElement;
 

  constructor() {
    this.#sendSmsEvent();
  }

  #confirmationHeader() {
    this.#popupInnerContainerEl?.classList.add("max-w-96")
    if (!this.#headerEl) return;
    this.#headerEl.textContent =
      "W wersji produkcyjnej użytkowanik otrzymuje informację o udanej wysyłce SMS-ów lub o braku środków na koncie SMSAPI warunkujących wysyłkę SMS-ów.";
    this.#popupInnerContainerEl?.append(this.#headerEl);
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

    console.log("", deletedMemberId);
    loader.removeLoading();
    this.#headerEl?.remove();
    this.#btnsContainerEl?.remove();
    this.#confirmationHeader();
  }

  #sendSmsEvent() {
    this.#btnYesEl?.addEventListener("click", this.#handleSendSms.bind(this));
  }
}
