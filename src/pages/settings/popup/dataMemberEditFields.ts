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
    "^[\\d-]{11,}$",
    "tel",
    "Telefon",
    "Telefon min. 9 cyfr"
  ),
  new DataFieldCreator("join_dateEdit", "", "\\S", "month", "", " "),
];
