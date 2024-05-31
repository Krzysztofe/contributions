import { Helpers } from "../../../utils/helpers";
import { ModelMonth } from "../../../sharedModels/modelMonth";

import { ModelObjectAny } from "../../../sharedModels/modelObjectAny";

export class StateCalendar {
  static sortedCalendar: ModelObjectAny[] | [] = [];

  static setCalendar(members: ModelObjectAny[]) {
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
      (member: ModelObjectAny) => ({
        ...monthsKeys.reduce<{
          [key: string]: ModelMonth;
        }>(
          (acc, key, idx) => {
            acc[key] = member[key]
              ? {
                  id: member.id,
                  fullname: member.fullname,
                  join_date: member.join_date,
                  monthNumber: (idx + 1).toString(),
                  amount: member[key].amount || "0",
                  comment: member[key].comment || "",
                  pay_date: member[key].pay_date || "",
                }
              : {
                  id: member.id,
                  fullname: member.fullname,
                  join_date: member.join_date,
                  monthNumber: (idx + 1).toString(),
                  amount: "0",
                  comment: "",
                  pay_date: "",
                };
            return acc;
          },
          {
            fullname: member.fullname,
            id: member.id,
            join_date: member.join_date,
          }
        ),
      })
    );

    this.sortedCalendar = Helpers.sortList(processMembersList);
  }
}
