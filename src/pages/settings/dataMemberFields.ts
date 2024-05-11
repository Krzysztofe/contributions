import { DataFieldCreator } from "../../components/dataFieldCreator";

export const dataMemberFields = [
  DataFieldCreator.createDataField(
    "firstname",
    "",
    true,
    "^(?:\\p{L}\\s*){3,}$",
    "text",
    "Imię",
    "Imię min. 3 litery"
  ),
  DataFieldCreator.createDataField(
    "lastname",
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
    "^[\\d-]{11,}$",
    "tel",
    "Telefon",
    "Telefon min. 9 cyfr"
  ),
];
