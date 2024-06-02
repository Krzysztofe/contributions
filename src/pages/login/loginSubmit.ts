import { ModelRequestOptions } from "./../../sharedModels/modelRequestOptions";
import { LoadingButtonCreator } from "../../components/loadingsCreators/loadingButtonCreator";
import { URL_AUTH } from "../../data/dataUrl";
import { Helpers } from "../../utils/helpers";
import { ValidationGeneric } from "../../utils/validationGeneric";

export class LoginSubmit {
  #formEl = document.querySelector("form");
  #errorAuthEl = document.getElementById("authError");
  #btnLoader = new LoadingButtonCreator("btnSubmit");
  #event: SubmitEvent | null = null;

  constructor() {
    this.#submitEvent();
  }

  #POSTOptions(): ModelRequestOptions | undefined {
    if (!this.#event) return;

    const formValues = Helpers.getFormValues(this.#event);

    return {
      url: URL_AUTH,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        login: formValues.login,
        password: formValues.password,
      },
    };
  }

  #validations() {
    if (!this.#event) return;
    this.#errorAuthEl && (this.#errorAuthEl.innerText = "");
    const formKeys = Object.keys(Helpers.getFormValues(this.#event));
    const errors = new ValidationGeneric(formKeys).errors;
    if (errors.length > 0) return;
    return "go";
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.#event = e;
    if (this.#validations() !== "go") return;

    // POST Login
    this.#btnLoader.removeSpinner();
    const postOptions = this.#POSTOptions();
    if (!postOptions) {
      return;
    }

    const jwt = await Helpers.fetchData(postOptions);

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      location.href = "/src/pages/calendar/calendar.html";
    } else {
      this.#errorAuthEl &&
        (this.#errorAuthEl.innerText = "Błędny login lub hasło");
    }
    this.#btnLoader.removeSpinner();
  }

  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
