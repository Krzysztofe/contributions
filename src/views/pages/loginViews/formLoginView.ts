import { FormView } from "../../sharedViews/formView";

export class FormLoginView extends FormView {
  #printLoginErrorEl = document.createElement("div");

  constructor(elementId: string) {
    super(elementId);
  }

  createLoginErrorMsg() {
    this.#printLoginErrorEl.id = "authError";
    this.#printLoginErrorEl.classList.add(
      "text-xs",
      "h-4",
      "text-500",
      "text-danger"
    );
    this.formEl?.append(this.#printLoginErrorEl);
  }
}
