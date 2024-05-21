import { TableCreator } from "../../components/tableCreator";
import { StateMembers } from "../../components/stateMembers";

export class TableMembersPrinter {
  #table = new TableCreator("sectionTable");

  constructor() {
    this.#init();
  }

  #init() {
    if (
      !StateMembers.sortedMembers ||
      StateMembers.sortedMembers.length === 0
    ) {
      this.#table.noDataContainer();
    } else {
      this.#table.createTable(["max-w-[1000px]"]);
      this.#table.createTableHead({
        headers: [
          `${StateMembers.sortedMembers.length}`,
          "Imię i Nazwisko",
          "Telefon",
          "",
        ],
      });
      this.#table.createTableBody({
        cellsData: StateMembers.sortedMembers,
        icons: ["fa-trash"],
        cellInnerHtml: this.#cellInnerHtml,
        stylesTd: this.#cellStyles
      });
    }
  }
  #cellInnerHtml(value: string | { [key: string]: any }) {
    return `${value}`;
  }
  #cellStyles() {
    return ["whitespace-nowrap"];
  }
}
