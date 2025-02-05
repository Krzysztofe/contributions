import { Helpers } from "../utils/helpers";
import { ModelMonth } from "../sharedModels/modelMonth";
import { ModelObjectAny } from "../sharedModels/modelObjectAny";

export class StateCalendar {
  static sortedCalendar: ModelObjectAny[] = [];

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

  static createMember(member: ModelObjectAny) {
    const monthsData = this.monthsKeys.reduce<{
      [key: string]: ModelMonth;
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

  static setCalendar(members: ModelObjectAny[]) {
    if (!members || members.length === 0) return;
    const createMembersList = members.map((member: ModelObjectAny) => {
      return this.createMember(member);
    });

    this.sortedCalendar =
      createMembersList && Helpers.sortList(createMembersList);
  }

  static setPayedSum(memberId: string, amount: string, monthName: string) {
    const member = [...this.sortedCalendar].find(
      member => member.id === memberId
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

  static getPreviousMonthContribution(
    eTarget: HTMLElement,
    memberId: string
  ): number | null {
    const dataMonthDetails = eTarget?.getAttribute("data-month-details");
    if (!dataMonthDetails) return null;

    const monthNumber = JSON.parse(dataMonthDetails)?.monthNumber;
    const findMember = StateCalendar.sortedCalendar.find(
      ({ id }) => id === memberId
    );
    if (!findMember) return null;

    const monthName = Helpers.numberOnMonthEnglish(monthNumber);
    return findMember[monthName]?.amount ?? null;
  }

  static setYearsCotribs(
    memberId: string,
    amount: string,
    year: string,
    eTarget: HTMLElement | null
  ) {
    const member = [...this.sortedCalendar].find(
      member => member.id === memberId
    );

    if (!member) return;

    if (!eTarget) return;
    const prevMonthContrib = this.getPreviousMonthContribution(
      eTarget,
      memberId
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
    let newTotalContribs = 0;

    if (!addToTotalContribs) return;
    if (prevTotalContribs < 0 && addToTotalContribs > 0) {
      newTotalContribs = prevTotalContribs + addToTotalContribs;
    } else if (prevTotalContribs < 0 && addToTotalContribs > 0) {
      newTotalContribs = prevTotalContribs - addToTotalContribs;
    } else {
      newTotalContribs = prevTotalContribs + addToTotalContribs;
    }

    member.payedContribs = newTotalContribs;
console.log('wwwwwwwww',)
    const memberIdx = this.sortedCalendar.indexOf(member);
    this.sortedCalendar[memberIdx] = member;
  }
}
