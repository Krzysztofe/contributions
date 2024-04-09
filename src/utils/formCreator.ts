import { FormSubmit } from "../pages/login/loginSubmit.ts";
import { BtnCreator } from "./btnCreator.ts";
import { FieldsCreator } from "./fieldsCreator.ts";
import { ValidationLogin } from "../pages/login/validation.ts";

export class FormCreator {
  #formEl: HTMLFormElement | null = null;
  #parentEl: HTMLElement | null;
  #dataFields;

  constructor(element: string, dataFields: any[]) {
    this.#parentEl = document.getElementById(element);
    this.#dataFields = dataFields;
    this.#init();
  }

  #init() {
    // this.#submitEvent();
  }

  createForm(formStyles: string[]) {
    this.#formEl = document.createElement("form");
    this.#formEl.id = "form";
    this.#formEl.classList.add(...formStyles);
    this.#formEl.setAttribute("novalidate", "");
    this.#parentEl?.append(this.#formEl);
  }

  createFields() {
    this.#formEl?.append(FieldsCreator.createFields(this.#dataFields));
  }

  createBtn(innerText: string, btnStyles: string[]) {
    const btnEl = document.createElement("button");
    btnEl.setAttribute("type", "submit");
    btnEl.innerText = innerText;
    btnEl.classList.add(...btnStyles);
    this.#formEl?.append(btnEl);
  }

  submitEvent() {
    const validation = new ValidationLogin();
    const formSubmition = new FormSubmit(validation);
    this.#formEl?.addEventListener(
      "submit",
      formSubmition.handleSubmit.bind(formSubmition)
    );
  }
}
