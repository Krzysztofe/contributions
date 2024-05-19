import { FormCreator } from "../../components/formsCreators/formCreator";
import { getFormValues } from "../../utils/getFormValues";
import { HttpRequest } from "../../services/httpRequest";
import { LoadingButtonCreator } from "../../components/loadingsCreators/loadingButtonCreator";

export class FormLogin extends FormCreator {
  printLoginError: HTMLElement | null = null;

  constructor(elementId: string) {
    super(elementId);
  }

  createLoginErrorMsg() {
    const printLoginError = document.createElement("div");
    printLoginError.id = "authError"
    printLoginError.classList.add("text-xs", "h-4", "text-red-500");
    this.formEl?.append(printLoginError);
  
  }

}
