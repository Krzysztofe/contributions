import { FormCreator } from "../../components/formCreator";

export class FormLogin extends FormCreator {
  #printLoginErrorEl: HTMLElement | null = null;

  constructor(elementId: string) {
    super(elementId);
  }

  createLoginErrorMsg() {
    this.#printLoginErrorEl = document.createElement("div");
    this.#printLoginErrorEl.id = "authError";
    this.#printLoginErrorEl.classList.add("text-xs", "h-4", "text-red-500");
    this.formEl?.append(this.#printLoginErrorEl);
  }
}
