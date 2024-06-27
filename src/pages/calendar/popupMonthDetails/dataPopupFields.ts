import { DataFieldCreator } from "../../../components/dataFieldCreator";

//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const dataPopupFields = [
  new DataFieldCreator("amount", "", "", "number", "Kwota", "x"),
  new DataFieldCreator("pay_date", "", "", "date", "", "x"),
  new DataFieldCreator("comment", "", "", "textarea", "Uwagi", "x"),
];