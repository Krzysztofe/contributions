import { DataFieldCreator } from "../../../components/dataFieldCreator";

//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const dataPopupFields = [
  new DataFieldCreator("amount", "", "", "number", "kwota", "x"),
  new DataFieldCreator("date", "", "", "date", "", "x"),
  new DataFieldCreator("comment", "", "", "textarea", "Uwagi", "x"),
];