import { TableCreator } from "../../components/table/tableCreator";

export class TableCalendarPrinter {
  #dataTableHead: string[];
  #dataTableBody: any[]
  constructor() {
    this.#dataTableHead = [
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
    this.#dataTableBody = [
      { name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Jan Sam",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
      {
        name: "Adam Kowalski",
        jan: true,
        feb: true,
        mar: true,
        apr: true,
        may: true,
        jun: true,
        jul: true,
        aug: true,
        sep: true,
        oct: true,
        nov: true,
        dec: true,
      },
    ];
    this.#init();
  }
  #init() {
    const calendarTable = new TableCreator("sectionTable");
    calendarTable.createTable(["max-w-[1200px]"]);
    calendarTable.createTableHead(this.#dataTableHead);
    calendarTable.createTableBody(this.#dataTableBody)
  }
}
