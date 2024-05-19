import { dataLoginFields } from "./dataLoginFields";
import { FormLogin } from "./formLogin";
import { LoginSubmit } from "./loginSubmit";

export class FormLoginPrinter {
  #form = new FormLogin("main");
  constructor() {
    this.#init();
  }
  #init() {
    this.#form.createForm({
      formId: "loginForm",
      styles: ["flex", "flex-col", "sm:bg-white", "sm:border", "px-16", "py-8"],
    });
    this.#form.createFields({ inputsData: dataLoginFields });
    this.#form.createBtn({
      innerText: "Zaloguj się",
      styles: ["text-center", "w-full", "py-1", "m-auto"],
    });
    this.#form.createLoginErrorMsg();
    new LoginSubmit()
  }
}
