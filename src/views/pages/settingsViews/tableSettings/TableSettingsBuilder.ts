import { iconTrash } from "../../../../icons/iconTrash";
import { iconEdit } from "../../../../icons/iconEdit";
import { MembersModel } from "../../../../models/settingsModels/membersModel";
import { TableView } from "../../../sharedViews/tableView";




export class TableSettingsBuilder {
  #table = new TableView("sectionTable");

  constructor() {
    this.#init();
  }

  #init() {
    const { sortedMembers } = MembersModel;

    if (!sortedMembers || sortedMembers.length === 0) {
      this.#table.noDataContainer();
      return;
    }

    this.#table.createTable(["max-w-[1000px]"]);
    this.#table.createTableHead({
      headers: [
        `${sortedMembers.length}`,
        "Nazwisko i imię",
        "E-mail",
        "Data wstąpienia",
        "",
      ],
      stylesTh: ["bg-primary_dark"],
    });

    this.#table.createTableBody({
      tdDataList: sortedMembers,
      icons: [iconEdit, iconTrash],
      tdInnerHtml: this.#tdInnerHtml,
      tdStyles: ["whitespace-nowrap"],
    });
  }

  #tdInnerHtml(value: string | { [key: string]: string }) {
    return `${value}`;
  }
}