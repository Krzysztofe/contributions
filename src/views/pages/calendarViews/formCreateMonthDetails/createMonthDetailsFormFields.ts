import { FormFieldConfig } from "../../../../config/formFieldConfig";

//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const createMonthDetailsFormFields = [
  new FormFieldConfig("amount", "", "", "number", "Kwota", "x"),
  new FormFieldConfig("pay_date", "", "", "date", "", "x"),
  new FormFieldConfig("comment", "", "", "textarea", "Uwagi", "x"),
];
