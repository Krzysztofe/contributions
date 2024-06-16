import { LoadingTdCreator } from "../../../components/loadingsCreators/loadingTdCreator";
import { URL_MONTH_DETAILS } from "../../../data/dataUrl";
import { Helpers } from "../../../utils/helpers";
import { StateAmount } from "../states/StateAmount";
import { StateYear } from "../states/StateYear";
import { ReprintAmountInMontch } from "./reprintAmountInMonth";

export class HandleUpdateMonthAmount {
  #eTarget: HTMLElement | null = null;
  #monthDetails: string | null = null;
  #tbodyEl = document.querySelector("tbody");
  #spinner: LoadingTdCreator | null = null;

  constructor(eTarget: HTMLElement) {
    this.#eTarget = eTarget;
    this.#monthDetails = eTarget.getAttribute("data-month-details");
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
    const { monthNumber, id } =
      this.#monthDetails && JSON.parse(this.#monthDetails);

    return {
      url: URL_MONTH_DETAILS,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        client_id: id,
        year: StateYear.year,
        month: monthNumber,
        amount: StateAmount.amount,
      },
    };
  }

  async #handleUpdateAmount() {
    this.#addTbodyBlocade();
    this.#spinner?.createSpinner();
    await Helpers.fetchData(this.#PATCHoptions());
    this.#eTarget && new ReprintAmountInMontch(this.#eTarget);
    this.#removeTbodyBlocade();
    this.#spinner?.removeSpinner();
  }
}
