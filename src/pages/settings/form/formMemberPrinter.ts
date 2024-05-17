import { dataMemberFields } from "../dataMemberFields";
import { FormCreateMember } from "./formMemberCreator";

export class FormMemberPrinter {
  #memberForm = new FormCreateMember("sectionMemberForm");
  constructor() {
    this.#init();
  }

  #init() {
    this.#memberForm.createForm("memberForm", [
      "mt-4",
      "mb-8",
      "m-auto",
      "md:mb-4",
      "flex",
      "flex-col",
      "items-center",
      "md:flex-row",
      "md:justify-center",
      "relative",
      "max-w-max",
    ]);
    this.#memberForm.createFields(
      dataMemberFields,
      ["max-w-48", "md:max-w-40", "md:mr-2"],
      ["max-w-48", "md:max-w-40", "text-uppercase", "capitalize"]
    );
    this.#memberForm.createBtn("Zapisz", [
      "w-48",
      "md:w-auto",
      "mb-auto",
      "border-none",
    ]);
    this.#memberForm.createMemberErrorMsg();
    this.#memberForm.submitEvent();
    this.#memberForm.createToast();
  }
}
