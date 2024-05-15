import { FormLogin } from "../../components/formsCreators/formLoginCreator";
import { dataLoginFields } from "./dataLoginFields";
import { URL_AUTH } from "../../data/dataUrl";

export class LoginFormPrinter {
  constructor() {
    this.#init();
  }
  #init() {
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

    loginForm.createBtn("Zaloguj się", [
      "text-center",
      "w-full",
      "py-1",
      "m-auto",
    ]);

    loginForm.createLoginErrorMsg();

    loginForm.submitEvent(URL_AUTH);
  }
}
