import { ModelMemberSettings } from "../../sharedModels/moedelMemberSettings";
import { StateMembers } from "../../components/stateMembers";
import { TableMembersPrinter } from "./tableMembersPrinter";
import { AlertCreator } from "../../components/alertCreator/alertCreator";
import { LoadingTableSettings } from "./loadingTableSettings";

export class ReprintSettingsPanel {
  #loading = new LoadingTableSettings();
  constructor(updatedData: ModelMemberSettings[]) {
    StateMembers.setMembers(updatedData);
    document.querySelector("table")?.remove();
    new TableMembersPrinter();
    new AlertCreator();
    this.#loading.removeFormErrors();
  }
}
