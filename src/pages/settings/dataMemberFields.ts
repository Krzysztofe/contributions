

import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataMemberFields = [
  DataFieldCreator.createDataField(
    "name",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "text",
    "Imię"
  ),
  DataFieldCreator.createDataField(
    "surname",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "text",
    "Nazwisko"
  ),
  DataFieldCreator.createDataField(
    "phone",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "number",
    "Telefon"
  ),
];
