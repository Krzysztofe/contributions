import { StateCalendar } from "../../states/StateCalendar";
import { Helpers } from "../../utils/helpers";

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

  #getPrevMonthContribution() {
    const findMember = StateCalendar.sortedCalendar.find(
      ({ id }) => id === this.#memberID
    );

    const monthName =
      this.#monthNumb && Helpers.numberOnMonthEnglish(this.#monthNumb);

    if (!findMember) return null;
    return (monthName && findMember[monthName]?.amount) ?? null;
  }

  #calculateNewBalance(prevTotalBalance: number, addToTotalBalance: number) {
    if (addToTotalBalance === 0) return prevTotalBalance;
    return prevTotalBalance + addToTotalBalance;
  }


  #updateTdTotalBalance() {
    const trEl = this.#tdChanged?.parentElement;

    if (!trEl) return;

    const tdTotalSumEl = trEl?.querySelector(
      "[data-total-sum-to-pay]"
    ) as HTMLElement;
    if (!tdTotalSumEl) return;

    const prevTotalBalance = this.#getPrevTotalBalance(tdTotalSumEl);
    const prevMonthContrib = this.#getPrevMonthContribution();

    if (!prevMonthContrib) return;
    const comparedContrib = prevMonthContrib - this.#addedContrib;
    const addToTotalBalance =
      comparedContrib !== 0
        ? Math.abs(comparedContrib) * Math.sign(-comparedContrib)
        : 0;

    if (!addToTotalBalance) return;
    const newTotalBalance = Helpers.calculateNewBalance(
      prevTotalBalance,
      addToTotalBalance
    );

    // console.log("prevTotalBalance", prevTotalBalance);
    //  console.log("addToTotalBalance", addToTotalBalance);
    //    console.log("newTotalBalance", newTotalBalance);
     

    if (!newTotalBalance) return;

    Helpers.printNewBalanceText(newTotalBalance, tdTotalSumEl);
  }
}
