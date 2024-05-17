import { TableCreator } from "../../components/tableCreator";
import { StateMembers } from "../../components/stateMembers";

export class TableMembersPrinter {
  constructor() {
    this.#init();
  }
  #settingsTable = new TableCreator("sectionTable");

  #init() {
    if (
      !StateMembers.sortedMembers ||
      StateMembers.sortedMembers.length === 0
    ) {
      this.#settingsTable.noDataContainer();
    } else {
      this.#settingsTable.createTable(["max-w-[1000px]"]);
      this.#settingsTable.createTableHead([
        `${StateMembers.sortedMembers.length}`,
        "Imię i Nazwisko",
        "Telefon",
        "",
      ]);
      this.#settingsTable.createTableBody(StateMembers.sortedMembers, [
        "fa-trash",
      ]);
    }
  }
}
