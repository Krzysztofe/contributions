import { DataFieldCreator } from "../../components/dataFieldCreator";
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
    "^[\\d-]{11,}$",
    "tel",
    "Telefon",
    "Telefon min. 9 cyfr"
  ),
  new DataFieldCreator("join_date", "Data", "", "month", "", "x"),
];
