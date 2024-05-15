import { dataMemberFields } from "../dataMemberFields";
import { FormCreateMember } from "./formMemberCreator";

export class FormMemberPrinter {
  constructor() {
    this.printForm();
  }

  printForm() {
    const memberForm = new FormCreateMember("sectionMemberForm");

    memberForm.createForm("memberForm", [
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

    memberForm.createFields(
      dataMemberFields,
      ["max-w-48", "md:max-w-40", "md:mr-2"],
      ["max-w-48", "md:max-w-40", "text-uppercase", "capitalize"]
    );
    memberForm.createBtn("Zapisz", [
      "w-48",
      "md:w-auto",
      "mb-auto",
      "border-none",
    ]);
    memberForm.createMemberErrorMsg();
    memberForm.submitEvent();
    memberForm.createToast();
  }
}
