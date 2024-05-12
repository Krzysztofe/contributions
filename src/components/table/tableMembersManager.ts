import { TableCreator } from "./tableCreator";
import { AlertCreator } from "../alertCreator";

export class TableMembersManager {
  #fetchedData: any[];
  #sortedData: any[] | null = null;

  constructor(fetchedData: any[]) {
    this.#fetchedData = fetchedData;
    this.init();
  }

  init() {
    this.#transformedData();
    this.#printTable();
  }

  #transformedData() {
    const selectedData = this.#fetchedData.map(
      ({
        fullname,
        phone,
        id,
      }: {
        fullname: string;
        phone: string;
        id: string;
      }) => {
        return { id, fullname, phone };
      }
    );
    const sortedData = selectedData.sort((a: any, b: any) => {
      let nameA = a.fullname.toLowerCase();
      let nameB = b.fullname.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    this.#sortedData = sortedData;
  }

  #printTable() {
    const settingsTable = new TableCreator("sectionTable");
    settingsTable.createTable(["max-w-[1000px]"]);
    if (!this.#sortedData || this.#sortedData.length === 0) {
      settingsTable.noDataContainer();
    } else {
      settingsTable.createTableHead([
        `${this.#sortedData.length}`,
        "Imię i Nazwisko",
        "Telefon",
        "",
      ]);

      settingsTable.createTableBody(this.#sortedData, ["fa-trash"]);
      new AlertCreator("sectionTable", "tableMembers", this.#sortedData);
    }
  }
}
