import { printedYearModel } from "../../models/calendarModels/printedYearModel";
import { LoadingTdView } from "../../views/pages/calendarViews/loaders/loadingTdView";
import { URL_MONTH_DETAILS } from "../../config/apiUrl";
import { Helpers } from "../../utils/helpers";
import { AmountModel } from "../../models/calendarModels/amountModel";
import { CalendarModel } from "../../models/calendarModels/calendarModel";
import { ReprintTdTotalBalanceView } from "../../views/pages/calendarViews/reprints/reprintTdTotalBalanceView";
import { ReprintAmountInMontchView } from "../../views/pages/calendarViews/reprints/reprintAmountInMonthView";
import { ReprintTdYearBalanceView } from "../../views/pages/calendarViews/reprints/reprintTdYearBalanceView";

export class UpdateMonthAmountController {
  #eTarget: HTMLElement | null = null;
  #monthDetails: string | null = null;
  #tbodyEl = document.querySelector("tbody");
  #spinner: LoadingTdView | null = null;
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
    this.#spinner = new LoadingTdView(this.#eTarget);
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
        year: printedYearModel.year,
        month: this.#monthNumber || "",
        amount: AmountModel.amount,
      },
    };
  }

  async #handleUpdateAmount() {
    this.#addTbodyBlocade();

    this.#spinner?.createSpinner();
    await Helpers.fetchData(this.#PATCHoptions());
    this.#eTarget && new ReprintAmountInMontchView(this.#eTarget);

    this.#removeTbodyBlocade();
    new ReprintTdYearBalanceView(`${this.#memberId}_${this.#monthNumber}`);
    new ReprintTdTotalBalanceView(
      `${this.#memberId}_${this.#monthNumber}`,
      parseInt(AmountModel.amount)
    );
    this.#spinner?.removeSpinner();

    if (!this.#memberId || !this.#monthName || !this.#monthNumber) return;

    CalendarModel.setYearsCotribs(
      this.#memberId,
      this.#monthNumber,
      AmountModel.amount,
      this.#eTarget
    );
    CalendarModel.setPayedSum(
      this.#memberId,
      AmountModel.amount,
      this.#monthName
    );
  }
}
