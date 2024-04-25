import { DataFieldCreator } from "../../components/dataFieldCreator";

export const dataLoginFields = [
  DataFieldCreator.createDataField(
    "login",
    "",
    true,
    "",
    "text",
    "Login",
    "Login min. 3 znaki"
  ),
  DataFieldCreator.createDataField(
    "password",
    "",
    true,
    "",
    "password",
    "Hasło",
    "Hasło in. 3 znaki"
  ),
];
