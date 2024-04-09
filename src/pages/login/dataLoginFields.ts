import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataLoginFields = [
  DataFieldCreator.createDataField(
    "login",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "text",
    "Login"
  ),
  DataFieldCreator.createDataField(
    "password",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "password",
    "Hasło"
  ),
];
