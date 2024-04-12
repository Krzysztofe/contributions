import { FormCreator } from "../../components/formCreator";
import { URL_Members } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { dataLoginFields } from "./dataLoginFields";
import { HeaderCreator } from "./headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingPageCreator";

new LoadigPageCreator()
new HttpRequest(URL_Members);

new HeaderCreator(["grid", "place-items-center"]);
const loginForm = new FormCreator("main");

loginForm.createForm("loginForm", [
  "flex",
  "flex-col",
  // "sm:bg-slate-200",
  // "bg-primary",
  "bg-white",
  "sm:border",
  "px-16",
  "py-8"
]);

loginForm.createFields(dataLoginFields);

loginForm.createBtn("Zaloguj się", [
  "text-center",
  "w-full",
  "py-1",
  "bg-accent",
  "text-white",
  "m-auto",
  // "mt-2",
]);

loginForm.submitEvent();
