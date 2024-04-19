import { FormCreator } from "../../components/formCreator";
// import { URL_Members } from "../../data/dataUrl";
// import { HttpRequest } from "../../services/httpRequest";
import { dataLoginFields } from "./dataLoginFields";
import { HeaderCreator } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingPageCreator";

new LoadigPageCreator();
// new HttpRequest(URL_Members);

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
  "bg-accent",
  "m-auto",
]);

loginForm.submitEvent();
// <div class="h-5 bg-blue-400 sticky top-14">Table head</div>;
