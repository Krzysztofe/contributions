import { FormCreator } from "../../../components/formCreator";

export class FormMemberCreator extends FormCreator {
  #body = document.querySelector("body");
  #errorMemberEl = document.createElement("div");
  #toastEl = document.createElement("div");

  constructor(elementId: string) {
    super(elementId);
  }

  createMemberErrorMsg() {
    this.#errorMemberEl.id = "customErrorMessage";
    this.#errorMemberEl.classList.add(
      "text-xs",
      "h-4",
      "text-red-500",
      "w-48",
      "md:absolute",
      "md:bottom-1",
      "md:left-0"
    );
    this.formEl?.append(this.#errorMemberEl);
  }

  createToast() {
    this.#toastEl.id = "toast";
    this.#toastEl.classList.add(
      "fixed",
      "left-[50%]",
      "top-14",
      "p-1",
      "px-6",
      "text-white",
      "bg-dark",
      "z-40"
    );
    this.#toastEl.style.transform = "translate(-50%, -100%)";
    this.#body?.prepend(this.#toastEl);
  }
}
