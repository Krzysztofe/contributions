import { Helpers } from "../../../../utils/helpers";
import { CalendarModel } from "../../../../models/calendarModels/calendarModel";
import { TableCalendarView } from "./tableCalendarView";
import { TypeMemberCalendar } from "../../../../sharedTypes/typeMemberCalendar";
import { TypeObjectString } from "../../../../sharedTypes/typeObjectString";
import { TypeObjectAny } from "../../../../sharedTypes/typeObjectAny";
import { wrapperWidth } from "../../../../constans/numbersConstants";
import { monthsPolish } from "../../../../constans/monthsConstants";
import { printedYearModel } from "../../../../models/calendarModels/printedYearModel";

export class TableCalendarBuilder {
  #membersSum = CalendarModel.sortedCalendar?.length || "";
  #dataTableHead: string[] = [`${this.#membersSum}`, "", ...monthsPolish];
  #dataTableBody =
  CalendarModel.sortedCalendar &&
    Helpers.copy(CalendarModel.sortedCalendar).map(
      (member: TypeMemberCalendar) => {
        delete member.join_date;
        delete member.sum;
        delete member?.yearsCotribs;
        delete member?.payedContribs;
        return member;
      }
    );
  #table = new TableCalendarView("sectionTable");

  constructor() {
    if (
      !CalendarModel.sortedCalendar ||
      CalendarModel.sortedCalendar.length === 0
    ) {
      this.#table.noDataContainer();
      return;
    }
    this.#table.createTable([wrapperWidth, "m-auto"]);
    this.#table.createTableHead({
      headers: [
        ...this.#dataTableHead,
        `Bilans ${printedYearModel.year}`,
        "Bilans całkowity",
      ],
      stylesTh: ["bg-accent", "text-white"],
    });
    this.#table.createSelect();
    this.#table.createTableBody({
      tdDataList: this.#dataTableBody,
      tdInnerHtml: this.#tdInnerHtml.bind(this),
      tdStylesCustom: this.#tdStylesCustom,
      tdSetAtribut: this.#tdSetAtribut.bind(this),
    });

    this.#table.createArrowCollapse();
    this.#table.tdElemsBgColor();
    this.#table.tdJoinDateBgColor();
    this.#table.createTdYearBalances();
    this.#table.createTdTotalBalances();
  }

  #tdStylesCustom(idx?: number) {
    return idx === 0
      ? ["whitespace-nowrap"]
      : ["cursor-pointer", "min-w-20", "whitespace-normal"];
  }

  #tdSetAtribut({
    tdEl,
    idx,
    databaseValue,
  }: {
    tdEl: HTMLElement;
    idx: number;
    databaseValue: TypeObjectAny | string;
  }) {
    if (typeof databaseValue !== "object") return;
    const month = databaseValue;
    const monthDetailsJSON = Helpers.createDataMonthDetails(month);
    const monthId = `${month.id}_${month.monthNumber}`;

    if (idx > 0) {
      return [
        tdEl.setAttribute("data-month-details", monthDetailsJSON),
        tdEl.setAttribute("data-month-id", monthId),
        tdEl.setAttribute("data-join-date", month.join_date),
      ];
    }
  }

  #tdInnerHtml(value: string | TypeObjectString) {
    if (typeof value !== "string") {
      return Helpers.tdInnerHtmlPattern(value);
    } else return "";
  }
}
