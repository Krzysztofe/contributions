import { dataLoginFields } from "./dataLoginFields";
import { HeaderCreator } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadings/loadingPageCreator";
import { FormLogin } from "../../components/formCreator";
import { URL_AUTH } from "../../data/dataUrl";

new LoadigPageCreator();
new HeaderCreator(["grid", "place-items-center"]);

const loginForm = new FormLogin("main");

loginForm.createForm("loginForm", [
  "flex",
  "flex-col",
  "sm:bg-white",
  "sm:border",
  "px-16",
  "py-8",
]);

loginForm.createFields(dataLoginFields);

loginForm.createBtn("Zaloguj się", ["text-center", "w-full", "py-1", "m-auto"]);

loginForm.createLoginErrorMsg()


loginForm.submitEvent(URL_AUTH);
