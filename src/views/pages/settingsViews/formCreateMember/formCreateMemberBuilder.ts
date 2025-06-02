import { CreateMemberController } from "../../../../controllers/settingsControllers/createMemberController";
import { createMemberFormFields } from "./createMemberFormFields";
import { FormCreateMemberView } from "./formCreateMemberView";

export class FormCreateMemberBuilder {
  #form = new FormCreateMemberView("sectionMemberForm");

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
      inputsData: createMemberFormFields,
      fieldStyles: ["max-w-48", "md:max-w-40", "md:mr-2"],
      inputStyles: ["max-w-48", "md:max-w-40", "w-full"],
    });
    this.#form.createBtn({
      innerText: "Zapisz",
      styles: ["w-48", "md:w-auto", "mb-auto", "border-none"],
      id: "btnCreateMember",
    });
    this.#form.createMemberErrorMsg("submitMemberError");
    this.#form.createToast();
    new CreateMemberController();
  }
}
