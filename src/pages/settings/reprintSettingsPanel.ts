TableMembersPrinter;
import { AlertCreator } from "../../components/alertCreator/alertCreator";
import { LoadingTableSettings } from "./loadingTableSettings";
import { TableMembersPrinter } from "./tableMembersPrinter";

export class ReprintSettingsPanel {
  #loading = new LoadingTableSettings();

  constructor() {
    document.querySelector("table")?.remove();
    new TableMembersPrinter();
    new AlertCreator();
    this.#loading.removeFormErrors();
  }
}
