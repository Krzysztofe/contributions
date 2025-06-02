import { FormFieldConfig } from "../../../../config/formFieldConfig";

//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const createMemberFormFields = [
  new FormFieldConfig(
    "firstname",
    "",
    "^(?:(?:\\p{L}|[\\s-]){3,})$",
    "text",
    "Imię",
    "Imię min. 3 litery"
  ),
  new FormFieldConfig(
    "lastname",
    "",
    "^(?:(?:\\p{L}|[\\s-]){3,})$",
    "text",
    "Nazwisko",
    "Nazwisko min. 3 litery"
  ),
  new FormFieldConfig(
    "email",
    "",
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    "email",
    "E-mail",
    "Format email"
  ),
  new FormFieldConfig("join_date", "Data", "\\S", "month", "", " "),
];
