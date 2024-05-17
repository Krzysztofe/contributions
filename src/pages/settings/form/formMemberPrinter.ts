import { dataMemberFields } from "../dataMemberFields";
import { FormMemberCreator } from "./formMemberCreator";

export class FormMemberPrinter {
  #form = new FormMemberCreator("sectionMemberForm");
  constructor() {
    this.#init();
  }

  #init() {
    this.#form.createForm("memberForm", [
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
    this.#form.createFields(
      dataMemberFields,
      ["max-w-48", "md:max-w-40", "md:mr-2"],
      ["max-w-48", "md:max-w-40", "text-uppercase", "capitalize"]
    );
    this.#form.createBtn("Zapisz", [
      "w-48",
      "md:w-auto",
      "mb-auto",
      "border-none",
    ]);
    this.#form.createMemberErrorMsg();
    this.#form.submitEvent();
    this.#form.createToast();
  }
}
