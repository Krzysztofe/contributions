import { Helpers } from "../../../utils/helpers";
import { StateCalendar } from "../states/StateCalendar";
import { TableCalendar } from "./tableCalendar";
import { ModelMemberCalendar } from "../../../sharedModels/modelMemberCalendar";
import { ModelObjectString } from "../../../sharedModels/modelObjectString";
import { ModelObjectAny } from "../../../sharedModels/modelObjectAny";
import { wrapperWidth } from "../../../data/dataNumbers";
import { monthsPolish } from "../../../data/dataMonths";

export class TableCalendarPrinter {
  #membersSum = StateCalendar.sortedCalendar?.length || "";
  #dataTableHead: string[] = [
    `${this.#membersSum}`,
    "",
    ...monthsPolish,
  ];

  #dataTableBody =
    StateCalendar.sortedCalendar &&
    Helpers.copy(StateCalendar.sortedCalendar).map(
      (member: ModelMemberCalendar) => {
        delete member.join_date;
        delete member.sum;
        return member;
      }
    );

  #table = new TableCalendar("sectionTable");

  constructor() {
    if (
      !StateCalendar.sortedCalendar ||
      StateCalendar.sortedCalendar.length === 0
    ) {
      this.#table.noDataContainer();
      return;
    }
    this.#table.createTable([wrapperWidth, "m-auto"]);
    this.#table.createTableHead({
      headers: this.#dataTableHead,
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
    this.#table.createTdSums();
  }

  #tdStylesCustom(idx?: number) {
    return idx === 0
      ? ["whitespace-nowrap"]
      : ["cursor-pointer", "min-w-12", "max-w-12", "whitespace-normal"];
  }

  #tdSetAtribut({
    tdEl,
    idx,
    databaseValue,
  }: {
    tdEl: HTMLElement;
    idx: number;
    databaseValue: ModelObjectAny | string;
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

  #tdInnerHtml(value: string | ModelObjectString) {
    if (typeof value !== "string") {
      return Helpers.tdInnerHtmlPattern(value);
    } else return "";
  }
}
