import { Helpers } from "../../utils/helpers";
import { HelpersBalance } from "../../utils/helpersBalance";
import { TypeMonth } from "../../sharedTypes/typeMonth";
import { TypeObjectAny } from "../../sharedTypes/typeObjectAny";

export class CalendarModel {
  static sortedCalendar: TypeObjectAny[] = [];

  static monthsKeys = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  static createMember(member: TypeObjectAny) {
    const monthsData = this.monthsKeys.reduce<{
      [key: string]: TypeMonth;
    }>((acc, key, idx) => {
      const month = member[key] || {};

      acc[key] = {
        id: member.id,
        fullname: member.fullname,
        join_date: member.join_date,
        monthNumber: (idx + 1).toString(),
        amount: month.amount || "0",
        comment: month.comment || "",
        pay_date: month.pay_date || "",
      };

      return acc;
    }, {});

    const sum = this.monthsKeys.reduce(
      (total, key) => total + parseInt(monthsData[key].amount),
      0
    );

    const processedMember = {
      fullname: member.fullname,
      id: member.id,
      join_date: member.join_date,
      sum,
      yearsCotribs: member.years_contribs,
      payedContribs: member.payed_contribs,
      ...monthsData,
    };

    return processedMember;
  }

  static setCalendar(members: TypeObjectAny[]) {
    if (!members || members.length === 0) return;
    const createMembersList = members.map((member: TypeObjectAny) => {
      return this.createMember(member);
    });

    this.sortedCalendar =
      createMembersList && Helpers.sortList(createMembersList);
  }

  static setPayedSum(memberId: string, amount: string, monthName: string) {
    const member = [...this.sortedCalendar].find(
      (member) => member.id === memberId
    );

    if (member && member[monthName]) {
      const memberIdx = this.sortedCalendar.indexOf(member);

      member[monthName].amount = amount;

      const sum = this.monthsKeys.reduce(
        (total, key) => total + parseInt(member[key].amount),
        0
      );

      member.sum = sum;
      this.sortedCalendar[memberIdx] = member;
    }
  }

  static calculateNewBalance(
    prevTotalBalance: number,
    addToTotalBalance: number
  ) {
    if (addToTotalBalance === 0) return prevTotalBalance;
    return prevTotalBalance + addToTotalBalance;
  }

  static setYearsCotribs(
    memberId: string,
    monthNumber: string,
    amount: string,
    eTarget: HTMLElement | null
  ) {
    const member = [...this.sortedCalendar].find(
      (member) => member.id === memberId
    );

    if (!member) return;

    if (!eTarget) return;
    const prevMonthContrib = HelpersBalance.getPrevMonthContribution(
      parseInt(memberId),
      monthNumber
    );

    const prevTotalContribs = member.payedContribs;

    if (prevMonthContrib === null) return;

    const balancedContrib =
      prevMonthContrib === 0
        ? prevMonthContrib + parseInt(amount)
        : prevMonthContrib - parseInt(amount);

    const addToTotalContribs =
      balancedContrib !== 0
        ? Math.abs(balancedContrib) * Math.sign(-balancedContrib)
        : 0;

    const newTotalBalance = HelpersBalance.calculateNewBalance(
      prevTotalContribs,
      addToTotalContribs
    );

    member.payedContribs = newTotalBalance;
    const memberIdx = this.sortedCalendar.indexOf(member);
    this.sortedCalendar[memberIdx] = member;
  }
}
