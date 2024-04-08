import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataLoginFields = [
  DataFieldCreator.createDataField(
    "login",
    "Login",
    true,
    "^[a-zA-Z –-]+$",
    "text",
    "Login"
  ),
  DataFieldCreator.createDataField(
    "password",
    "Hasło",
    true,
    "^[a-zA-Z –-]+$",
    "password",
    "Hasło"
  ),
];
