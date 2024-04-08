import { FormSubmit } from "../pages/login/loginSubmit.ts";
import { BtnCreator } from "./btnCreator.ts";
import { FieldsCreator } from "./fieldsCreator.ts";
import { ValidationLogin } from "../pages/login/validation.ts";

export class FormCreator {
  #formEl;
  #parentEl;
  #dataFields;

  constructor(element: string, dataFields: any[]) {
    this.#formEl = document.createElement("form");
    this.#parentEl = document.getElementById(element);
    this.#parentEl?.append(this.#formEl);
    this.#dataFields = dataFields;
    this.#init();
  }

  #init() {
    this.#createForm();
    this.#createFields();
    this.#createBtn();
    this.#submitEvent();
  }

  #createForm() {
    this.#formEl.id = "form";
    this.#formEl.classList.add(
      "flex",
      "flex-col",
      "sm:bg-slate-200",
      "bg-white",
      "p-5"
    );
    this.#formEl.setAttribute("novalidate", "");
  }

  #createFields() {
    this.#formEl.append(FieldsCreator.createFields(this.#dataFields));
  }

  #createBtn() {
    this.#formEl.append(BtnCreator.createBtn("Zaloguj się"));
  }

  #submitEvent() {
    const validation = new ValidationLogin();
    const formSubmition = new FormSubmit(validation);
    this.#formEl.addEventListener(
      "submit",
      formSubmition.handleSubmit.bind(formSubmition)
    );
  }
}
