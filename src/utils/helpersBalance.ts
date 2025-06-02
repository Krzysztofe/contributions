import { CalendarModel } from "../models/calendarModels/calendarModel";
import { Helpers } from "./helpers";

export class HelpersBalance {
  static printNewBalanceText(newBalance: number, tdTotalSumEl: HTMLElement) {
    let innerText = "";
    if (newBalance < 0) innerText = `${newBalance} zł`;
    if (newBalance > 0) innerText = `+${newBalance} zł`;
    if (newBalance === 0) innerText = `\u00A0 ${newBalance} zł`;
    tdTotalSumEl?.classList.toggle("text-danger", newBalance < 0);
    tdTotalSumEl?.classList.toggle("text-dark", newBalance >= 0);

    return (tdTotalSumEl.innerText = innerText);
  }

  static calculateNewBalance(
    prevTotalBalance: number,
    addToTotalBalance: number
  ) {
    if (addToTotalBalance === 0) return prevTotalBalance;
    return prevTotalBalance + addToTotalBalance;
  }

  static getPrevMonthContribution(memberID: number, monthNumber: string) {
    const findMember = CalendarModel.sortedCalendar.find(
      ({ id }) => id === memberID
    );

    const monthName = monthNumber && Helpers.numberOnMonthEnglish(monthNumber);

    if (!findMember) return null;
    return (monthName && findMember[monthName]?.amount) ?? null;
  }
}
