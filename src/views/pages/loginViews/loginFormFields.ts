import { FormFieldConfig } from "../../../config/formFieldConfig";

//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const loginFormFields = [
  new FormFieldConfig("login", "", "", "text", "Login", "x"),
  new FormFieldConfig("password", "", "", "password", "Hasło", "x"),
];
