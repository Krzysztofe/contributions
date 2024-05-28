import { Helpers } from "../../../utils/helpers";
import { StateCalendar } from "../StateCalendar";
import { TableCalendar } from "./tableCalendar";

export class TableCalendarPrinter {
  #dataTableHead: string[] = [
    "",
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
  #dataTableBody = StateCalendar.sortedCalendar;

  constructor() {
    const table = new TableCalendar("sectionTable");
    table.createTable(["max-w-[1200px]"]);
    table.createTableHead({
      headers: this.#dataTableHead,
      stylesTh: ["bg-accent", "text-white"],
    });
    table.createTableBody({
      cellsData: this.#dataTableBody,
      cellInnerHtml: this.tdInnerHtml.bind(this),
      stylesTd: this.#tdStyles,
      tdSetAtribut: this.#tdSetAtribut,
    });
    table.createSelect();
    table.selectEvent();
    table.tdElemsBgColor();
    table.createArrowCollapse();
    table.collapseEvent();
    // console.log("", this.#dataTableBody);
  }

  #tdStyles(idx: number): string[] | [] {
    return idx === 0
      ? ["whitespace-nowrap"]
      : ["cursor-pointer", "min-w-20", "max-w-20", "whitespace-normal"];
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
    const { id, fullname, monthName } = month;

    const monthDetails = `${id}_${fullname}_${monthName}`.replace(" ", "-");

    if (idx > 0) {
      return tdElement.setAttribute("data-month-details", monthDetails);
    }
  }

  tdInnerHtml(month: any) {
    const { id, fullname, monthName } = month;

    const monthDetails = `${id}_${fullname}_${monthName}`.replace(" ", "-");
    return Helpers.tdInnerHtmlPattern(month, monthDetails);
  }
}
