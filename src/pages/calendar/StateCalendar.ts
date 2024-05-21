import { Helpers } from "../../utils/helpers";

export class StateCalendar {
  static sortedCalendar: any = [];

  static setCalendar(members: any) {
    const monthsKeys = [
      "fullname",
      "january",
      "febuary",
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
      (member: { [key: string]: string }) => ({
        ...monthsKeys.reduce<{ [key: string]: string }>((acc, key) => {
          acc[key] = member[key] || "0";
          return acc;
        }, {}),
      })
    );

    this.sortedCalendar = Helpers.sortList(processMembersList);
  
  }
}
