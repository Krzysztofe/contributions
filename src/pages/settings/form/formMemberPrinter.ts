import { dataMemberFields } from "../dataMemberFields";
import { FormMemberCreator } from "./formMemberCreator";
import { FormMemberSubmit } from "./formMemberSubmit";

export class FormMemberPrinter {
  #form = new FormMemberCreator("sectionMemberForm");
  constructor() {
    this.#init();
  }

  #init() {
    this.#form.createForm({
      formId: "memberForm",
      styles: [
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
      ],
    });
    this.#form.createFields({
      inputsData: dataMemberFields,
      fieldStyles: ["max-w-48", "md:max-w-40", "md:mr-2"],
      inputStyles: ["max-w-48", "md:max-w-40", "text-uppercase", "capitalize"],
    });
    this.#form.createBtn({
      innerText: "Zapisz",
      styles: ["w-48", "md:w-auto", "mb-auto", "border-none"],
    });
    this.#form.createMemberErrorMsg();
    this.#form.createToast();
    new FormMemberSubmit();
  }
}
