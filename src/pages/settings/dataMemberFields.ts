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
    "^\\d{6,}$",
    "number",
    "Telefon",
    "Telefon min. 6 cyfr"
  ),
];
