import { FormFieldConfig } from "../../../../config/formFieldConfig";
//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const editMemberFormFields = [
  new FormFieldConfig(
    "emailEdit",
    "",
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    "email",
    "E-mail",
    "Format email"
  ),
];
