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
    "email",
    "",
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    "email",
    "E-mail",
    "Format email"
  ),
  new DataFieldCreator("join_date", "Data", "\\S", "month", "", " "),
];
