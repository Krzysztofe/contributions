import { ModelMember } from "./../../sharedModels/moedelMember";
import { StateMembers } from "../../components/stateMembers";
import { TableMembersPrinter } from "./tableMembersPrinter";
import { AlertCreator } from "../../components/alertCreator/alertCreator";
import { LoadingTableSettings } from "./loadingTableSettings";
import { ToastPrinter } from "../../components/toastPrinter";

export class RecreateSettingPanel {
  #loading = new LoadingTableSettings();
  constructor(updatedData: ModelMember[], toastText: string) {
    StateMembers.setMembers(updatedData);
    document.querySelector("table")?.remove();
    new TableMembersPrinter();
    new AlertCreator();
    this.#loading.removeFormErrors();
    this.#loading.removeLoading();
    new ToastPrinter(toastText);
  }
}
