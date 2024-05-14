import { FormCreator } from "./formCreator";
import { getFormValues } from "../../utils/getFormValues";
import { ValidationUniversal } from "../../utils/validationUniversal";
import { HttpRequest } from "../../services/httpRequest";
import { LoadingButtonCreator } from "../loadingsCreators/loadingButtonCreator";

export class FormLogin extends FormCreator {
  printLoginError: HTMLElement | null = null;

  constructor(elementId: string) {
    super(elementId);
  }

  createLoginErrorMsg() {
    this.printLoginError = document.createElement("div");
    this.printLoginError.classList.add("text-xs", "h-4", "text-red-500");
    this.formEl?.append(this.printLoginError);
  }

  handleSubmit(e: SubmitEvent, url: string) {
    e.preventDefault();

    const { login, password } = getFormValues(e);
    const request = new HttpRequest();
    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();

    const requestOptions = {
      url,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: { login, password },
    };

    request.sendRequest(requestOptions).then(requestValues => {
      if (requestValues?.fetchedData) {
        localStorage.setItem("jwt", requestValues?.fetchedData);
        location.href = "/src/pages/calendar/calendar.html";
      } else {
        this.printLoginError &&
          (this.printLoginError.innerText = "Błędny login lub hasło");
      }

      if (requestValues?.isLoading === false) {
        btnLoader.removeSpinner();
      }
    });
    // this.formEl?.reset();
  }

  submitEvent(url: string) {
    this.formEl?.addEventListener("submit", e => this.handleSubmit(e, url));
  }
}
