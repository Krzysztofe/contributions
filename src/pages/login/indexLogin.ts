import { FormCreator } from "../../utils/formCreator";
import { dataLoginFields } from "./dataLoginFields";
import { HeaderCreator } from "./headerCreator";

new HeaderCreator(["grid", "place-items-center"]);
const loginForm = new FormCreator("main");

loginForm.createForm("loginForm",[
  "flex",
  "flex-col",
  "sm:bg-slate-200",
  "bg-white",
  "p-5",
]);

loginForm.createFields(dataLoginFields);

loginForm.createBtn("Zaloguj się", [
  "text-center",
  "w-1/2",
  "py-1",
  "bg-gray-500",
  "m-auto",
  "mt-2",
]);

loginForm.submitEvent()

