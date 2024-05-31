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
        "Imię i Nazwisko",
        "Telefon",
        "Data wstąpienia",
        "",
      ],
      stylesTh: ["bg-primary_dark"],
    });

    this.#table.createTableBody({
      cellsData: sortedMembers,
      icons: ["fa-trash"],
      tdInnerHtml: this.#cellInnerHtml,
      stylesTd: this.#cellStyles,
    });
  }
  #cellInnerHtml(value: string | { [key: string]: any }) {
    return `${value}`;
  }
  #cellStyles() {
    return ["whitespace-nowrap"];
  }
}
