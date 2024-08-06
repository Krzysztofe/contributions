import { DataFieldCreator } from "../../../components/dataFieldCreator";
//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const dataMemberEditFields = [
  new DataFieldCreator(
    "phoneEdit",
    "",
    "^(?=(?:\\D*\\d){9}$)(?:\\d-?){8}\\d$",
    "tel",
    "Telefon",
    "Telefon 9 cyfr"
  ),
];
