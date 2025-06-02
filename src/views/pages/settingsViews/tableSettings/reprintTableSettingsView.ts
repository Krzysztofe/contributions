import { LoadingTableSettingsView } from "../loadingTableSettingsView";
import { TableSettingsBuilder } from "./TableSettingsBuilder";


export class ReprintTableSettingsView {
  #loading = new LoadingTableSettingsView();

  constructor() {
    document.querySelector("table")?.remove();
    new TableSettingsBuilder();
    this.#loading.removeFormErrors();
  }
}
