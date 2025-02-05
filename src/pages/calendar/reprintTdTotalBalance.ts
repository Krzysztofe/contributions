import { HalpersBalance } from "../../utils/helpersBalance";

export class ReprintTdTotalBalance {
  #monthNumb: string | null = null;
  #tdChanged: HTMLElement | null = null;
  #memberID: number | null = null;
  #addedContrib: number;

  constructor(tdDataAtributeId: string | null, addedSum: number) {
    this.#tdChanged = document.querySelector(
      `[data-month-id="${tdDataAtributeId}"]`
    );
    this.#memberID = tdDataAtributeId
      ? parseInt(tdDataAtributeId.split("_")[0])
      : null;
    this.#monthNumb = tdDataAtributeId ? tdDataAtributeId.split("_")[1] : null;
    this.#addedContrib = addedSum;
    this.#updateTdTotalBalance();
  }

  #getPrevTotalBalance(tdSumEl: HTMLElement): number {
    return (
      parseInt(
        tdSumEl.textContent?.replace("zł", "").replace("+", "") ?? "0"
      ) || 0
    );
  }


  #updateTdTotalBalance() {
    const trEl = this.#tdChanged?.parentElement;

    if (!trEl || !this.#memberID || !this.#monthNumb) return;

    const tdTotalSumEl = trEl?.querySelector(
      "[data-total-sum-to-pay]"
    ) as HTMLElement;
    if (!tdTotalSumEl) return;

    const prevTotalBalance = this.#getPrevTotalBalance(tdTotalSumEl);
    const prevMonthContrib = HalpersBalance.getPrevMonthContribution(
      this.#memberID,
      this.#monthNumb
    );

    if (!prevMonthContrib) return;
    const comparedContrib = prevMonthContrib - this.#addedContrib;
    const addToTotalBalance =
      comparedContrib !== 0
        ? Math.abs(comparedContrib) * Math.sign(-comparedContrib)
        : 0;

    if (!addToTotalBalance) return;
    const newTotalBalance = HalpersBalance.calculateNewBalance(
      prevTotalBalance,
      addToTotalBalance
    );

    if (!newTotalBalance) return;

    HalpersBalance.printNewBalanceText(newTotalBalance, tdTotalSumEl);
  }
}
