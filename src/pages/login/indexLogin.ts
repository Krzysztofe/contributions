import { FormCreator } from "../../components/formCreator";
import { dataLoginFields } from "./dataLoginFields";
import { HeaderCreator } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingPageCreator";

new LoadigPageCreator();
new HeaderCreator(["grid", "place-items-center"]);
const loginForm = new FormCreator("main");

loginForm.createForm("loginForm", [
  "flex",
  "flex-col",
  "sm:bg-white",
  "sm:border",
  "px-16",
  "py-8",
]);

loginForm.createFields(dataLoginFields);

loginForm.createBtn("Zaloguj się", [
  "text-center",
  "w-full",
  "py-1",
  "m-auto",
]);

loginForm.submitEvent();
