import { DataFieldCreator } from "../../utils/dataFieldCreator";

export const dataLoginFields = [
  new DataFieldCreator("login", "Login", true, "^[a-zA-Z –-]+$", "text"),
  new DataFieldCreator("password", "Hasło", true, "^[a-zA-Z –-]+$", "password"),
];
