import { DataFieldCreator } from "../../../components/dataFieldCreator";
//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const dataMemberEditFields = [
  new DataFieldCreator(
    "firstnameEdit",
    "",
    "^(?:(?:\\p{L}|[\\s-]){3,})$",
    "text",
    "Imię",
    "Imię min. 3 litery"
  ),
  new DataFieldCreator(
    "lastnameEdit",
    "",
    "^(?:(?:\\p{L}|[\\s-]){3,})$",
    "text",
    "Nazwisko",
    "Nazwisko min. 3 litery"
  ),
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
