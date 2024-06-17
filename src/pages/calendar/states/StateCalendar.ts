import { Helpers } from "../../../utils/helpers";
import { ModelMonth } from "../../../sharedModels/modelMonth";
import { ModelObjectAny } from "../../../sharedModels/modelObjectAny";

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
      ...monthsData,
    };

    return processedMember;
  }

  static setCalendar(members: ModelObjectAny[]) {
    const createMembersList = members?.map((member: ModelObjectAny) => {
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
}
