import { DataFieldCreator } from "../../components/dataFieldCreator";

export const dataSearchFields = [
  DataFieldCreator.createDataField(
    "search",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "search",
    "Szukaj",
    ""
  ),
];
