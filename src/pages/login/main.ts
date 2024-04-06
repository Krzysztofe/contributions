import { FormSubmit } from "./loginSubmit.ts";
import { BtnCreator } from "../../utils/btnCreator.ts";
import { FieldsCreator } from "../../utils/fieldsCreator.ts";
import { dataLoginFields } from "./dataLoginFields.ts";
import { ValidationLogin } from "./validation.ts";

class FormCreator {
  #formEl;
  #parentEl;

  constructor(element: string) {
    this.#formEl = document.createElement("form");
    this.#formEl.id = "form";
    this.#formEl.classList.add("flex", "flex-col", "bg-slate-200", "p-5");
    this.#formEl.setAttribute("novalidate", "");
    this.#parentEl = document.getElementById(element);
    this.#parentEl?.append(this.#formEl);
    this.#init();
  }

  #init() {
    this.#createFields();
    this.#createBtn();
    this.#setEvent();
  }

  #createFields() {
    this.#formEl.append(FieldsCreator.createFields(dataLoginFields));
  }
  #createBtn() {
    this.#formEl.append(BtnCreator.createBtn("Zaloguj się"));
  }

  #setEvent() {
    const validation = new ValidationLogin();
    const formSubmition = new FormSubmit(validation);
    this.#formEl.addEventListener(
      "submit",
      formSubmition.handleSubmit.bind(formSubmition)
    );
  }
}

new FormCreator("main");
