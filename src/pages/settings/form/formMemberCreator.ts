import { FormCreator } from "../../../components/formsCreators/formCreator";

export class FormMemberCreator extends FormCreator {
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
      "top-14",
      "p-1",
      "px-6",
      "text-white",
      "text-sm",
      "bg-black_opacity",
      "z-40"
    );
    toastEl.style.transform = "translateY(-100%)";
    this.formEl?.prepend(toastEl);
  }
}
