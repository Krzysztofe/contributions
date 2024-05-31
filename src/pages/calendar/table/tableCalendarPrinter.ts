import { Helpers } from "../../../utils/helpers";
import { StateCalendar } from "../states/StateCalendar";
import { TableCalendar } from "./tableCalendar";
import { ModelMonth } from "../../../sharedModels/modelMonth";

export class TableCalendarPrinter {
  #dataTableHead: string[] = [
    `${StateCalendar.sortedCalendar.length}`,
    "",
    "Sty.",
    "Lut.",
    "Mar.",
    "Kwi.",
    "Maj",
    "Cze.",
    "Lip.",
    "Sie.",
    "Wrz.",
    "Paź.",
    "Lis.",
    "Gru.",
  ];

  #dataTableBody = JSON.parse(JSON.stringify(StateCalendar.sortedCalendar)).map(
    (member: any) => {
      delete member.join_date;
      return member;
    }
  );

  #table = new TableCalendar("sectionTable");

  constructor() {
    this.#table.createTable(["max-w-[1200px]"]);
    this.#table.createTableHead({
      headers: this.#dataTableHead,
      stylesTh: ["bg-accent", "text-white"],
    });
    this.#table.createTableBody({
      cellsData: this.#dataTableBody,
      tdInnerHtml: this.#tdInnerHtml.bind(this),
      stylesTd: this.#stylesTd,
      tdSetAtribut: this.#tdSetAtribut.bind(this),
    });
    this.#table.createSelect();
    this.#table.selectEvent();
    this.#table.tdElemsBgColor();
    this.#table.tdJoinDateBgColor();
    this.#table.createArrowCollapse();
    this.#table.collapseEvent();
    console.log('',this.#dataTableBody)
  }

  #stylesTd(idx?: number): string[] | [] {
    return idx === 0
      ? ["whitespace-nowrap"]
      : ["cursor-pointer", "min-w-20", "max-w-20", "whitespace-normal"];
  }

  #tdSetAtribut({
    tdEl,
    idx,
    databaseValues,
  }: {
    tdEl: HTMLElement;
    idx: number;
    databaseValues: ModelMonth;
  }) {
    const month = databaseValues;
    const monthDetailsJSON = Helpers.createDataMonthDetails(month);
    const monthId = `${month.id}_${month.monthName}`;

    if (idx > 0) {
      return [
        tdEl.setAttribute("data-month-details", monthDetailsJSON),
        tdEl.setAttribute("data-month-id", monthId),
        tdEl.setAttribute("data-join-date", month.join_date),
      ];
    }
  }

  #tdInnerHtml(value: any) {
    return Helpers.tdInnerHtmlPattern(value);
  }
}
