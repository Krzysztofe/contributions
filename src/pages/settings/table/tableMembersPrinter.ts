import { TableCreator } from "../../../components/table/tableCreator";
import { AlertCreator } from "../../../components/alertCreator";

export class TableMembersPrinter {
  #fetchedData: any[];

  constructor(fetchedData: any[]) {
    this.#fetchedData = fetchedData;
    this.#init();
  }

  #init() {
    this.#printTable();
  }

  #printTable() {
    const settingsTable = new TableCreator("sectionTable");
    settingsTable.createTable(["max-w-[1000px]"]);
    if (!this.#fetchedData || this.#fetchedData.length === 0) {
      settingsTable.noDataContainer();
    } else {
      settingsTable.createTableHead([
        `${this.#fetchedData.length}`,
        "Imię i Nazwisko",
        "Telefon",
        "",
      ]);

      settingsTable.createTableBody(this.#fetchedData, ["fa-trash"]);
      new AlertCreator("sectionTable", "tableMembers", this.#fetchedData);
    }
  }
}
