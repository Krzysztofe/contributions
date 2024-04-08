

import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataMemberFields = [
  DataFieldCreator.createDataField(
    "name",
    "Imię",
    true,
    "^[a-zA-Z –-]+$",
    "text",
    "Imię"
  ),
  DataFieldCreator.createDataField(
    "surname",
    "Nazwisko",
    true,
    "^[a-zA-Z –-]+$",
    "text",
    "Nazwisko"
  ),
  DataFieldCreator.createDataField(
    "phone",
    "Telefon",
    true,
    "^[a-zA-Z –-]+$",
    "number",
    "Telefon"
  ),
];
