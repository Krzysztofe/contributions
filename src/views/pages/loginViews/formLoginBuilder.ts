import { loginFormFields } from "./loginFormFields";
import { FormLoginView } from "./formLoginView";
import { LoginSubmitController } from "../../../controllers/loginControllers/loginSubmitController";

export class FormLoginBuilder {
  #form = new FormLoginView("main");

  constructor() {
    this.#form.createForm({
      formId: "loginForm",
      styles: [
        "flex",
        "flex-col",
        "sm:bg-white",
        "sm:border",
        "sm:px-16",
        "py-8",
      ],
    });
    this.#form.createFields({ inputsData: loginFormFields });
    this.#form.createBtn({
      innerText: "Zaloguj się",
      styles: ["text-center", "w-full", "py-1", "m-auto"],
      id: "btnLogin",
    });
    this.#form.createLoginErrorMsg();
    new LoginSubmitController();
  }
}
