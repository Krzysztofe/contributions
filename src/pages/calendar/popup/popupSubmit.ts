import { Helpers } from "../../../utils/helpers";
import { LoadingButtonCreator } from "../../../components/loadingsCreators/loadingButtonCreator";

export class PopupSubmit {
  #formEl = document.querySelector("form");
  constructor() {
    this.#submetEvent();
  }

  #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();
    console.log("", Helpers.getFormValues(e));
  }
  #submetEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
