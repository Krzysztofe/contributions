import { FormCreator } from "./formCreator";
import { getFormValues } from "../../utils/getFormValues";
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

  fetchData(url: string, login: string, password: string) {
    const requestOptions = {
      url,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: { login, password },
    };
    const request = new HttpRequest();
    return request.sendRequest(requestOptions);
  }

  async handleSubmit(e: SubmitEvent, url: string) {
    e.preventDefault();

    const { login, password } = getFormValues(e);
    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();

    const data = await this.fetchData(url, login, password);
    if (data?.fetchedData) {
      localStorage.setItem("jwt", data?.fetchedData);
      location.href = "/src/pages/calendar/calendar.html";
    } else {
      this.printLoginError &&
        (this.printLoginError.innerText = "Błędny login lub hasło");
    }
    btnLoader.removeSpinner();
    this.formEl?.reset();
  }

  submitEvent(url: string) {
    this.formEl?.addEventListener("submit", e => this.handleSubmit(e, url));
  }
}
