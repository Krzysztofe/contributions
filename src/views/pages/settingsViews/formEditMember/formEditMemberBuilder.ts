import { EditMemberController } from "../../../../controllers/settingsControllers/editMemberController";
import { editMemberFormFields } from "./editMemberFormFields";
import { FormCreateMemberView } from "../formCreateMember/formCreateMemberView";

export class FormEditMemberBuilder {
  #form = new FormCreateMemberView("popupInnerContainer");
  #formEl: HTMLElement | null = null;
  #formHeaderEl: HTMLElement | null = null;
  #inputsElems: NodeListOf<HTMLInputElement> | undefined | null = null;
  #eventTarget: HTMLElement | null = null;
  #tdInRowElems: NodeListOf<HTMLElement> | undefined | null = null;
  #tdTextsContent: string[] | null = null;

  constructor(eventTarget: HTMLElement) {
    this.#eventTarget = eventTarget;
    this.#createForm();
  }

  #createFormHeader() {
    this.#formHeaderEl = document.createElement("h3");
    this.#formHeaderEl.classList.add("mb-3", "font-semibold");
    this.#tdTextsContent &&
      (this.#formHeaderEl.innerText = `${this.#tdTextsContent[1]}`);
    this.#formEl = document.getElementById("popupMemberEdit");
    this.#formEl?.prepend(this.#formHeaderEl);
  }

  #passValuesToInputs() {
    this.#inputsElems = document
      .getElementById("popupMemberEdit")
      ?.querySelectorAll("input");
    this.#tdInRowElems = this.#eventTarget
      ?.closest("tr")
      ?.querySelectorAll("td");

    if (!this.#tdInRowElems) return;
    this.#tdTextsContent = Array.from(this.#tdInRowElems).map((tdElem) => {
      return tdElem.textContent || "";
    });

    if (this.#inputsElems) {
      this.#inputsElems[0].value = this.#tdTextsContent[2];
    }
  }

  #createForm() {
    document.getElementById("popupMemberEdit")?.remove();
    this.#form.createForm({
      formId: "popupMemberEdit",
      styles: ["flex", "flex-col", "m-auto"],
    });
    this.#form.createFields({
      inputsData: editMemberFormFields,
      inputStyles: ["pr-0", "w-full"],
    });
    this.#form.createBtn({
      innerText: "Zapisz",
      styles: ["w-full", "py-1", "m-auto"],
      id: "btnEditMember",
    });

    this.#passValuesToInputs();
    this.#createFormHeader();

    new EditMemberController(
      this.#eventTarget?.getAttribute("data-member-id"),
      this.#eventTarget?.getAttribute("data-row-id")
    );
  }
}
