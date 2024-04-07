

import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataMemberFields = [
  DataFieldCreator.createDataField(
    "name",
    "Imię",
    true,
    "^[a-zA-Z –-]+$",
    "text"
  ),
  DataFieldCreator.createDataField(
    "surname",
    "Nazwisko",
    true,
    "^[a-zA-Z –-]+$",
    "text"
  ),
  DataFieldCreator.createDataField(
    "phone",
    "Telefon",
    true,
    "^[a-zA-Z –-]+$",
    "text"
  ),
];
