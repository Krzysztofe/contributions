import { DataFieldCreator } from "../../../components/dataFieldCreator";
//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const dataMemberFields = [
  new DataFieldCreator(
    "firstname",
    "",
    "^(?:(?:\\p{L}|[\\s-]){3,})$",
    "text",
    "Imię",
    "Imię min. 3 litery"
  ),
  new DataFieldCreator(
    "lastname",
    "",
    "^(?:(?:\\p{L}|[\\s-]){3,})$",
    "text",
    "Nazwisko",
    "Nazwisko min. 3 litery"
  ),
  new DataFieldCreator(
    "phone",
    "",
    "^(?=(?:\\D*\\d){9}$)(?:\\d-?){8}\\d$",
    "tel",
    "Telefon",
    "Telefon 9 cyfr"
  ),
  new DataFieldCreator("join_date", "Data", "\\S", "month", "", " "),
];
