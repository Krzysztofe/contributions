import { URL_MONTH_DETAILS } from "../../../data/dataUrl";
import { Helpers } from "../../../utils/helpers";
import { StateAmount } from "../states/StateAmount";
import { StateYear } from "../states/StateYear";
import { ReprintAmountInMontch } from "./reprintAmountInMonth";

export class HandleUpdateMonthAmount {
  #eTarget: HTMLElement | null = null;
  #monthDetails: string | null = null;

  constructor(eTarget: HTMLElement) {
    this.#eTarget = eTarget;
    this.#monthDetails = eTarget.getAttribute("data-month-details");
    this.#handleUpdateAmount();
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
    this.#PATCHoptions();
    await Helpers.fetchData(this.#PATCHoptions());
    this.#eTarget && new ReprintAmountInMontch(this.#eTarget);
  }
}
