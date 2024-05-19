import { Helpers } from "../../../utils/helpers";

export class PopupSubmit {
  #formEl = document.querySelector("form");
  constructor() {
    this.#submetEvent();
  }

  #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    Helpers.getFormValues(e)
  }
  #submetEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
