import { StateCalendar } from "../../states/StateCalendar";
import { Helpers } from "../../utils/helpers";

export class ReprintTdTotalSum {
  #tdChanged: HTMLElement | null = null;
  #memberID: number | null = null;
  #addedContrib: number;
  #eTarget: HTMLElement | null = null;

  constructor(
    tdDataAtributeId: string | null,
    addedSum: string,
    eTarget: HTMLElement | null = null
  ) {
    this.#eTarget = eTarget;
    this.#tdChanged = document.querySelector(
      `[data-month-id="${tdDataAtributeId}"]`
    );
    this.#memberID = tdDataAtributeId
      ? parseInt(tdDataAtributeId.split("_")[0])
      : null;
    this.#addedContrib = parseInt(addedSum);
    this.#updateTdSum();
  }

  #calculateMonthsToPay(trEl: Element): number {
    const joinDate = trEl
      .querySelector("[data-join-date]")
      ?.getAttribute("data-join-date");
    if (!joinDate) return 0;

    const [joinYear, joinMonth] = joinDate.split("-").map(Number);
    return (
      parseInt(Helpers.currentYear) * 12 +
      Helpers.currentMonthInNumber -
      (joinYear * 12 + joinMonth) +
      1
    );
  }

  #getPreviousTotalSum(tdSumEl: HTMLElement): number {
    return (
      parseInt(
        tdSumEl.textContent?.replace("zł", "").replace("+", "") ?? "0"
      ) || 0
    );
  }

  #getPreviousMonthContribution(): number | null {
    const dataMonthDetails = this.#eTarget?.getAttribute("data-month-details");
    if (!dataMonthDetails) return null;

    const monthNumber = JSON.parse(dataMonthDetails)?.monthNumber;
    const findMember = StateCalendar.sortedCalendar.find(
      ({ id }) => id === this.#memberID
    );
    if (!findMember) return null;

    const monthName = Helpers.numberOnMonthEnglish(monthNumber);
    return findMember[monthName]?.amount ?? null;
  }

  #updateTdSum() {
    const trEl = this.#tdChanged?.parentElement;
    if (!trEl) return;

    const tdTotalSumEl = trEl?.querySelector(
      "[data-total-sum-to-pay]"
    ) as HTMLElement;
    if (!tdTotalSumEl) return;

    const prevTotalBalance = this.#getPreviousTotalSum(tdTotalSumEl);
    const prevMonthContrib = this.#getPreviousMonthContribution();

    if (prevMonthContrib === null) return;

    const comparedContrib = prevMonthContrib - this.#addedContrib;
    const addToTotalBalance =
      comparedContrib !== 0
        ? Math.abs(comparedContrib) * Math.sign(-comparedContrib)
        : 0;

    if (!addToTotalBalance) return;

    let newTotalBalance;
   

    if (prevTotalBalance < 0 && addToTotalBalance > 0) {
      // console.log("first");
      newTotalBalance = prevTotalBalance + addToTotalBalance;
    } else if (addToTotalBalance === 0) {
      newTotalBalance = newTotalBalance;
    } else if (prevTotalBalance < 0 && addToTotalBalance > 0) {
      // console.log("uuu");
      newTotalBalance = prevTotalBalance - addToTotalBalance;
    } else {
      newTotalBalance = prevTotalBalance + addToTotalBalance;
    }

 console.log("newTotalBalance", newTotalBalance);

    let innerText;

    if (!newTotalBalance) return;
    if (newTotalBalance < 0) {
      innerText = `${newTotalBalance} zł`;
    } else if (newTotalBalance > 0) {
      innerText = `+${newTotalBalance} zł`;
    } else if (newTotalBalance === 0) {
      innerText = `\u00A0 ${newTotalBalance} zł`;
    }

    tdTotalSumEl?.classList.toggle("text-danger", newTotalBalance < 0);
    tdTotalSumEl?.classList.toggle("text-dark", newTotalBalance >= 0);
    tdTotalSumEl && (tdTotalSumEl.innerText = "");
    tdTotalSumEl && innerText && (tdTotalSumEl.innerText = innerText);
  }
}
