import { StateAmount } from "../../states/StateAmount";
import { Helpers } from "../../utils/helpers";

export class ReprintTdYearBalance {
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
      ?.map(elem => {
        const amounts = elem.textContent?.replace("zł", "").trim();
        return amounts ? parseInt(amounts) : 0;
      })
      .reduce((sum, curr) => sum + curr);

    const notActiveElems = trEl?.querySelectorAll("[data-not-active]") ?? [];
    const contribsNotToPay =
      notActiveElems.length * parseInt(StateAmount.amount) || 0;

    const newYearSum =
      payedMonthsSum -
      (Helpers.getCurrentYearContribsToPay() - contribsNotToPay);
      
    let innerText;
    if (newYearSum < 0) {
      innerText = `${newYearSum} zł`;
    } else if (newYearSum > 0) {
      innerText = `+${newYearSum} zł`;
    } else if (newYearSum === 0) {
      innerText = `\u00A0 ${newYearSum} zł`;
    }

    tdSumEl?.classList.toggle("text-danger", newYearSum < 0);
    tdSumEl?.classList.toggle("text-dark", newYearSum >= 0);
    tdSumEl && (tdSumEl.innerText = "");
    tdSumEl && innerText && (tdSumEl.innerText = innerText);
  }
}
