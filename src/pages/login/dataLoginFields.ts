import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataLoginFields = [
  DataFieldCreator.createDataField(
    "login",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "text",
    "Login",
    "Login min. 3 znaki"
  ),
  DataFieldCreator.createDataField(
    "password",
    "",
    true,
    "^[a-zA-Z –-]+$",
    "password",
    "Hasło",
    "Hasło in. 3 znaki"
  ),
];
