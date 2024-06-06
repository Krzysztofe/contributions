import { TableCreator } from "../../components/tableCreator";
import { StateMembers } from "../../components/stateMembers";

export class TableMembersPrinter {
  #table = new TableCreator("sectionTable");

  constructor() {
    this.#init();
  }

  #init() {
    const { sortedMembers } = StateMembers;
   
    if (!sortedMembers || sortedMembers.length === 0) {
      this.#table.noDataContainer();
      return;
    }

    this.#table.createTable(["max-w-[1000px]"]);
    this.#table.createTableHead({
      headers: [
        `${sortedMembers.length}`,
        "Nazwisko i imię",
        "Telefon",
        "Data wstąpienia",
        "",
      ],
      stylesTh: ["bg-primary_dark"],
    });

    this.#table.createTableBody({
      tdDataList: sortedMembers,
      icons: ["fa-trash"],
      tdInnerHtml: this.#tdInnerHtml,
      stylesTd: this.#stylesTd,
    });
  }
  #tdInnerHtml(value: string | {[key:string]: string}) {
    return `${value}`;
  }
  #stylesTd() {
    return ["whitespace-nowrap"];
  }
}
