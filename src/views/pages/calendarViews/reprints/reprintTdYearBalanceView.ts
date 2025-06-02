import { AmountModel } from "../../../../models/calendarModels/amountModel";
import { Helpers } from "../../../../utils/helpers";
import { HelpersBalance } from "../../../../utils/helpersBalance";

export class ReprintTdYearBalanceView {
  #tdChanged: HTMLElement | null = null;

  constructor(tdDataAtributeId: string | null) {
    this.#tdChanged = document.querySelector(
      `[data-month-id="${tdDataAtributeId}"]`
    );

    this.#updateTdBalance();
  }

  #updateTdBalance() {
    const trEl = this.#tdChanged?.parentElement;
    const tdSumEl = trEl?.querySelector("[data-sum-to-pay]") as HTMLElement;
    const amountElems = trEl?.querySelectorAll("[data=amount]");

    const payedMonthsSum = Array.from(amountElems || [])
      ?.map((elem) => {
        const amounts = elem.textContent?.replace("zł", "").trim();
        return amounts ? parseInt(amounts) : 0;
      })
      .reduce((sum, curr) => sum + curr);

    const notActiveElems = trEl?.querySelectorAll("[data-not-active]") ?? [];
    const contribsNotToPay =
      notActiveElems.length * parseInt(AmountModel.amount) || 0;

    const newYearSum =
      payedMonthsSum -
      (Helpers.getCurrentYearContribsToPay() - contribsNotToPay);

    HelpersBalance.printNewBalanceText(newYearSum, tdSumEl);
  }
}
