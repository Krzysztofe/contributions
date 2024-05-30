import { LoadingButtonCreator } from "../../components/loadingsCreators/loadingButtonCreator";
import { URL_AUTH } from "../../data/dataUrl";
import { Helpers } from "../../utils/helpers";
import { ValidationGeneric } from "../../utils/validationGeneric";

export class LoginSubmit {
  #formEl = document.querySelector("form");
  #errorAuthEl = document.getElementById("authError");

  constructor() {
    this.#submitEvent();
  }

  #POSTOptions(e: SubmitEvent) {
    return {
      url: URL_AUTH,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        login: Helpers.getFormValues(e).login,
        password: Helpers.getFormValues(e).password,
      },
    };
  }

  #validations(e: SubmitEvent) {
    this.#errorAuthEl && (this.#errorAuthEl.innerText = "");
    const formKeys = Object.keys(Helpers.getFormValues(e));
    const errors = new ValidationGeneric(formKeys).errors;
    if (errors.length > 0) return;
    return "go";
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.#validations(e) !== "go") return;

    // POST Login

    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();
    const data = await Helpers.fetchData(this.#POSTOptions(e));

    if (data) {
      localStorage.setItem("jwt", data);
      location.href = "/src/pages/calendar/calendar.html";
    } else {
      this.#errorAuthEl &&
        (this.#errorAuthEl.innerText = "Błędny login lub hasło");
    }
    btnLoader.removeSpinner();
  }

  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
