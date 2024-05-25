import { Helpers } from "../../utils/helpers";

type MonthModel =
  | {
      amount: string;
      comment: string;
      pay_date: string;
      id: string;
      fullname: string;
      monthName: string;
    }
  | string;

export class StateCalendar {
  static sortedCalendar: any = [];

  static setCalendar(members: any) {
    const monthsKeys = [
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

    const processMembersList = members.map(
      (member: { [key: string]: any }) => ({
        ...monthsKeys.reduce<{
          [key: string]: MonthModel
        }>(
          (acc, key, idx) => {
            acc[key] = member[key]
              ? {
                  id: member.id,
                  fullname: member.fullname,
                  monthName: idx.toString(),
                  amount: member[key].amount || "0",
                  comment: member[key].comment || "",
                  pay_date: member[key].pay_date || "",
                }
              : {
                  id: member.id,
                  fullname: member.fullname,
                  monthName: idx.toString(),
                  amount: "0",
                  comment: "",
                  pay_date: "",
                };
            return acc;
          },
          { fullname: member.fullname, id: member.id }
        ),
      })
    );

    this.sortedCalendar = Helpers.sortList(processMembersList);
  }
}
