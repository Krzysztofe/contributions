import { LoadingTdCreator } from "../../../components/loadingsCreators/loadingTdCreator";
import { URL_MONTH_DETAILS } from "../../../data/dataUrl";
import { Helpers } from "../../../utils/helpers";
import { ReprintTdSum } from "../reprintTdSum";
import { StateAmount } from "../../../states/StateAmount";
import { StateCalendar } from "../../../states/StateCalendar";
import { StatePrintedYear } from "../../../states/StatePrintedYear";
import { ReprintAmountInMontch } from "./reprintAmountInMonth";

export class HandleUpdateMonthAmount {
  #eTarget: HTMLElement | null = null;
  #monthDetails: string | null = null;
  #tbodyEl = document.querySelector("tbody");
  #spinner: LoadingTdCreator | null = null;
  #monthNumber: string | null = null;
  #monthName: string | null = null;
  #memberId: string | null = null;

  constructor(eTarget: HTMLElement) {
    this.#eTarget = eTarget;
    this.#monthDetails = eTarget.getAttribute("data-month-details");
    this.#memberId = this.#monthDetails && JSON.parse(this.#monthDetails)?.id;
    this.#monthNumber =
      this.#monthDetails && JSON.parse(this.#monthDetails)?.monthNumber;
    this.#monthName =
      (this.#monthNumber && Helpers.numberOnMonthEnglish(this.#monthNumber)) ||
      "";
    this.#spinner = new LoadingTdCreator(this.#eTarget);
    this.#handleUpdateAmount();
  }

  #addTbodyBlocade() {
    this.#tbodyEl?.classList.add("pointer-events-none");
  }

  #removeTbodyBlocade() {
    this.#tbodyEl?.classList.add("pointer-events-auto");
  }

  #PATCHoptions() {
    return {
      url: URL_MONTH_DETAILS,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        client_id: this.#memberId || "",
        year: StatePrintedYear.year,
        month: this.#monthNumber || "",
        amount: StateAmount.amount,
      },
    };
  }

  async #handleUpdateAmount() {
    this.#addTbodyBlocade();
    if (this.#memberId && this.#monthName) {
      StateCalendar.setPayedSum(
        this.#memberId,
        StateAmount.amount,
        this.#monthName
      );
    }

    this.#spinner?.createSpinner();
    await Helpers.fetchData(this.#PATCHoptions());
    this.#eTarget && new ReprintAmountInMontch(this.#eTarget);
    this.#removeTbodyBlocade();
    new ReprintTdSum(`${this.#memberId}_${this.#monthNumber}`);
    this.#spinner?.removeSpinner();
  }
}
