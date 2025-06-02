import { LoadingTableView } from "../../sharedViews/loadersViews/loadingTableView";

export class LoadingTableSettingsView extends LoadingTableView {
  removeFormErrors() {
    const errors = document.querySelectorAll(".h-4");
    errors.forEach((error) => ((error as HTMLElement).innerText = ""));
  }
}
