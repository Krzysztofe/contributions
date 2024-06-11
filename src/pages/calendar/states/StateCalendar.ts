import { Helpers } from "../../../utils/helpers";
import { ModelMonth } from "../../../sharedModels/modelMonth";
import { ModelObjectAny } from "../../../sharedModels/modelObjectAny";

export class StateCalendar {
  static sortedCalendar: ModelObjectAny[] | [] = [];
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

    const summ = this.monthsKeys.reduce(
      (total, key) => total + parseInt(monthsData[key].amount),
      0
    );

    const processedMember = {
      fullname: member.fullname,
      id: member.id,
      join_date: member.join_date,
      summ,
      ...monthsData,
    };

    return processedMember;
  }

  static setCalendar(members: ModelObjectAny[]) {
    const createMembersList = members.map((member: ModelObjectAny) => {
      return this.createMember(member);
    });

    this.sortedCalendar = Helpers.sortList(createMembersList);
  }
}
