import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataMemberFields = [
  DataFieldCreator.createDataField(
    "name",
    "",
    true,
    "^[\\p{L}]{3,}$",
    "text",
    "Imię",
    "Imię min. 3 znaki"
  ),
  DataFieldCreator.createDataField(
    "surname",
    "",
    true,
    "^[\\p{L}]{3,}$",
    "text",
    "Nazwisko",
    "Nazwisko min. 3 znaki"
  ),
  DataFieldCreator.createDataField(
    "phone",
    "",
    true,
    "^\\d{6,}$",
    "number",
    "Telefon",
    "Telefon min. 6 znaki"
  ),
];
