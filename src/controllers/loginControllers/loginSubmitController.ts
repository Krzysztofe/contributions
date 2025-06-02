import { TypeRequestOptions } from "../../sharedTypes/typeRequestOptions";
import { LoadingButtonView } from "../../views/sharedViews/loadersViews/loadingButtonView";
import { URL_AUTH } from "../../config/apiUrl";
import { Helpers } from "../../utils/helpers";

export class LoginSubmitController {
  #formEl = document.querySelector("form");
  #errorAuthEl = document.getElementById("authError");
  #btnLoader = new LoadingButtonView("btnLogin");
  #event: SubmitEvent | null = null;

  constructor() {
    this.#submitEvent();
  }

  #POSTOptions(): TypeRequestOptions | undefined {
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

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.#event = e;

    this.#btnLoader.createSpinner();
    const postOptions = this.#POSTOptions();
    if (!postOptions) {
      return;
    }

    const jwt = await Helpers.fetchData(postOptions);

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      location.href = "/src/views/pages/calendarViews/calendar.html";
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
