import { TableCreator } from "../../components/tableCreator";
import { StateMembers } from "../../components/stateMembers";

export class TableMembersPrinter {
  constructor() {
    this.#init();
  }

  #init() {
    const settingsTable = new TableCreator("sectionTable");

    if (
      !StateMembers.sortedMembers ||
      StateMembers.sortedMembers.length === 0
    ) {
      settingsTable.noDataContainer();
    } else {
      settingsTable.createTable(["max-w-[1000px]"]);
      settingsTable.createTableHead([
        `${StateMembers.sortedMembers.length}`,
        "Imię i Nazwisko",
        "Telefon",
        "",
      ]);
      settingsTable.createTableBody(StateMembers.sortedMembers, ["fa-trash"]);
    }
  }
}
