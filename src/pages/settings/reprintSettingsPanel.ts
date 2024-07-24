TableMembersPrinter;
import { LoadingTableSettings } from "./loadingTableSettings";
import { TableMembersPrinter } from "./tableMembersPrinter";

export class ReprintSettingsPanel {
  #loading = new LoadingTableSettings();

  constructor() {
    document.querySelector("table")?.remove();
    new TableMembersPrinter();
    this.#loading.removeFormErrors();
  }
}
