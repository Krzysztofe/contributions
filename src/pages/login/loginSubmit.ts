import { LoadingButtonCreator } from "../../components/loadingsCreators/loadingButtonCreator";
import { URL_AUTH } from "../../data/dataUrl";
import { Helpers } from "../../utils/helpers";

export class LoginSubmit {
  #formEl = document.querySelector("form");
  #errorEl = document.getElementById("authError");

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
        login: Helpers.getFormValues(e).login || "x",
        password: Helpers.getFormValues(e).password || "x",
      },
    };
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();

    const data = await Helpers.fetchData(this.#POSTOptions(e));

    if (data?.fetchedData) {
      localStorage.setItem("jwt", data?.fetchedData);
      location.href = "/src/pages/calendar/calendar.html";
    } else {
      this.#errorEl && (this.#errorEl.innerText = "Błędny login lub hasło");
    }
    btnLoader.removeSpinner();
  }

  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
