import { dataMemberFields } from "./dataMemberFields";
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
        "md:flex",
        "md:justify-center",
        "relative",
        "max-w-max",
      ],
    });
    this.#form.createFields({
      inputsData: dataMemberFields,
      fieldStyles: ["max-w-48", "md:max-w-40", "md:mr-2"],
      inputStyles: ["max-w-48", "md:max-w-40", "capitalize", "w-full"],
    });
    this.#form.createBtn({
      innerText: "Dodaj osobę",
      styles: ["w-48", "md:w-auto", "mb-auto", "border-none"],
      id: "btnCreateMember"
    });
    this.#form.createMemberErrorMsg();
    this.#form.createToast();
    new FormMemberSubmit();
  }
}
