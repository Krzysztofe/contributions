import { Helpers } from "../../../utils/helpers";
import { StateCalendar } from "../states/StateCalendar";
import { TableCalendar } from "./tableCalendar";

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
      cellInnerHtml: this.tdInnerHtml.bind(this),
      stylesTd: this.#tdStyles,
      tdSetAtribut: this.#tdSetAtribut.bind(this),
    });
    this.#table.createSelect();
    this.#table.selectEvent();
    this.#table.tdElemsBgColor();
    this.#table.createArrowCollapse();
    this.#table.collapseEvent();
  }

  #tdStyles(idx: number): string[] | [] {
    return idx === 0
      ? ["whitespace-nowrap"]
      : ["cursor-pointer", "min-w-20", "max-w-20", "whitespace-normal"];
  }

  #createMonthDetails(month: any) {
    const { id, fullname, monthName } = month;
    const transformedFulllName = fullname?.replace(/ /g, "_");
    const details = {
      id,
      fullname: transformedFulllName,
      monthName,
    };

    return JSON.stringify(details);
  }

  #tdSetAtribut({
    tdElement,
    idx,
    month,
  }: {
    tdElement: any;
    idx: number;
    month: any;
  }) {
    const monthDetails = this.#createMonthDetails(month);
    const monthId = `${month.id}_${month.monthName}`;
    if (idx > 0) {
      return [
        tdElement.setAttribute("data-month-details", monthDetails),
        tdElement.setAttribute("data-month-id", monthId),
      ];
    }
  }

  tdInnerHtml(month: any) {
    const monthDetails = this.#createMonthDetails(month);
    return Helpers.tdInnerHtmlPattern(month, monthDetails);
  }
}
