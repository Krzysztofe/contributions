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
      stylesTh: ["bg-accent", "text-white"],
    });
    table.createTableBody({
      cellsData: this.#dataTableBody,
      cellInnerHtml: this.#cellInnerHtml,
      stylesTd: this.#cellStyles,
    });
    table.createSelect();
    table.selectEvent();
    table.tdBgColor();
    table.createArrowCollapse();

    table.collapseEvent();
  }

  #cellInnerHtml(month: any) {
    const { amount, comment, pay_date } = month;

    return ` 
    <div data = "amount">${amount || "0"} zł</div> 
    <div data = "memberDetailsPrint" class = "collapseClose" >
      <div class = "overflow-hidden" data = ${
        pay_date === "" && comment === "" ? "emptyCollapse" : "fullCollapse"
      }>    
        <div class = "text-[0.6rem]">${pay_date || ""}</div> 
        <div class = "text-[0.6rem]">${comment || ""}</div> 
      </div>
    </div>`;
  }

  #cellStyles(idx: number): string[] | [] {
    return idx === 0
      ? ["whitespace-nowrap"]
      : ["cursor-pointer", "min-w-20", "max-w-20", "whitespace-normal"];
  }
}
