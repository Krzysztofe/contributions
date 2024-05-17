import { LoadingTableCreator } from "../../components/loadingsCreators/loadingTableCreator";

export class LoadingTableSettings extends LoadingTableCreator {
   removeFormErrors() {
    const errors = document.querySelectorAll(".h-4");
    errors.forEach(error => ((error as HTMLElement).innerText = ""));
  }
}
