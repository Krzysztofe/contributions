import { DataFieldCreator } from "../../components/dataFieldCreator";

//   name: string,
//   label: string,
//   regEx: string,
//   type: string,
//   placeholder: string,
//   errorMsg: string

export const dataLoginFields = [
  new DataFieldCreator("login", "", "", "text", "Login", "x"),
  new DataFieldCreator("password", "", "", "password", "Hasło", "x"),
];
