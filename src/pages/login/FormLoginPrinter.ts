import { FormLogin } from "../../components/formsCreators/formLoginCreator";
import { dataLoginFields } from "./dataLoginFields";
import { URL_AUTH } from "../../data/dataUrl";

export class FormLoginPrinter {
  #loginForm = new FormLogin("main");
  constructor() {
    this.#init();
  }
  #init() {
    this.#loginForm.createForm("loginForm", [
      "flex",
      "flex-col",
      "sm:bg-white",
      "sm:border",
      "px-16",
      "py-8",
    ]);
    this.#loginForm.createFields(dataLoginFields);
    this.#loginForm.createBtn("Zaloguj się", [
      "text-center",
      "w-full",
      "py-1",
      "m-auto",
    ]);
    this.#loginForm.createLoginErrorMsg();
    this.#loginForm.submitEvent(URL_AUTH);
  }
}
