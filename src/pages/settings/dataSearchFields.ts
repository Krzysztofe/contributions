import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataSearchFields = [
  DataFieldCreator.createDataField(
    "search",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "text",
    "Szukaj",
    ""
  ),
];
