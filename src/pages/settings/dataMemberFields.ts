import { DataFieldCreator } from "../../components/dataFieldCreator";

export const dataMemberFields = [
  DataFieldCreator.createDataField(
    "name",
    "",
    true,
    "^(?:\\p{L}\\s*){3,}$",
    "text",
    "Imię",
    "Imię min. 3 litery"
  ),
  DataFieldCreator.createDataField(
    "surname",
    "",
    true,
    "^(?:\\p{L}\\s*){3,}$",
    "text",
    "Nazwisko",
    "Nazwisko min. 3 litery"
  ),
  DataFieldCreator.createDataField(
    "phone",
    "",
    true,
    "^[\\d-]{9,}$",
    "text",
    "Telefon",
    "Telefon min. 9 cyfr"
  ),
];
