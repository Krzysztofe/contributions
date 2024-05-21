import { StateCalendar } from "./StateCalendar";
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
    "Paź",
    "Lis.",
    "Gru.",
  ];
  #dataTableBody = StateCalendar.sortedCalendar;

  constructor() {
    const table = new TableCalendar("sectionTable");
    table.createTable(["max-w-[1200px]"]);
    table.createTableHead({
      headers: this.#dataTableHead,
      stylesTh: this.#stylesTh,
    });
    table.createTableBody({
      cellsData: this.#dataTableBody,
      cellInnerHtml: this.#cellInnerHtml,
      stylesTd: this.#cellStyles,
    });
    table.createSelect();
    table.selectEvent();
  }

  #stylesTh(value: any) {
    return value.length === 14
      ? ["bg-accent", "text-white"]
      : ["bg-primary_dark"];
  }

  #cellInnerHtml(value: any) {
    const { amount, comment, pay_date } = value;
    if (value === "0") {
      return "0";
    }
    return `<div>${amount || "0"}</div> <div class = "text-[0.6rem]">${
      pay_date || ""
    }</div><div class = "text-[0.6rem]">${comment || ""}</div>`;
  }

  #cellStyles(idx: number): string[] | [] {
    return idx > 0
      ? ["cursor-pointer", "min-w-20", "max-w-20", "whitespace-normal"]
      : [];
  }

}
