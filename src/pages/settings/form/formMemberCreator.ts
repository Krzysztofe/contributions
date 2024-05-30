import { FormCreator } from "../../../components/formCreator";

export class FormMemberCreator extends FormCreator {
  #body = document.querySelector("body");

  constructor(elementId: string) {
    super(elementId);
  }

  createMemberErrorMsg() {
    const printMemberError = document.createElement("div");
    printMemberError.id = "customErrorMessage";
    printMemberError.classList.add(
      "text-xs",
      "h-4",
      "text-red-500",
      "w-48",
      "md:absolute",
      "md:bottom-1",
      "md:left-0"
    );
    this.formEl?.append(printMemberError);
  }

  createToast() {
    const toastEl = document.createElement("div");
    toastEl.id = "toast";
    toastEl.classList.add(
      "fixed",
      "left-[50%]",
      "top-14",
      "p-1",
      "px-6",
      "text-white",
      "bg-dark",
      "z-40"
    );
    toastEl.style.transform = "translate(-50%, -100%)";
    this.#body?.prepend(toastEl);
  }
}
