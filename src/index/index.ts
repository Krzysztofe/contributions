import "./style.css";
// import { setupCounter } from './counter.ts'
// import { createForm } from "./inputs.ts";

// createForm();

type ModelFormSubmit = {
  formEl: HTMLElement | null;
};

type ModelValidationLogin = {
  inputPasswordElem: HTMLElement | null;
  errorElem: HTMLElement | null;
};

type ModelValidation = {
  validate(): void;
  errors: string[];
};

// models

export class ValidationLogin {
  #inputPasswordElem: HTMLElement | null;
  #errorElem: HTMLElement | null;
  #errors: string[] = [];

  constructor({ inputPasswordElem, errorElem }: ModelValidationLogin) {
    this.#inputPasswordElem = inputPasswordElem;
    this.#errorElem = errorElem;
    this.#errors = [];
  }

  #validation() {
    if (
      this.#errorElem &&
      this.#inputPasswordElem instanceof HTMLInputElement &&
      this.#inputPasswordElem.value.length < 3
    ) {
      this.#errorElem.innerText = "error";
      this.#errors.push("error");
    } else if (this.#errorElem) {
      this.#errorElem.innerText = "";
    }
  }

  get errors() {
    return this.#errors;
  }

  validate() {
    this.#validation();
  }
}



// class FormSubmit {
//   #formElem: HTMLElement | null;
//   #validation: ModelValidation;

//   constructor({ formElem }: ModelFormSubmit, validation: ModelValidation) {
//     this.#formElem = formElem;
//     this.#validation = validation;
//     this.#init();
//   }

//   #init() {
//     this.#formElem?.addEventListener("submit", this.#handleLogin.bind(this));
//   }

//   #handleLogin(e: SubmitEvent) {
//     e.preventDefault();

//     this.#validation.validate();
//     if (this.#validation.errors.length > 0) return;
//   }
// }


export class FormSubmit {
  #formElem: HTMLElement | null;
  validation: ModelValidation;

  constructor({ formEl }: ModelFormSubmit, validation: ModelValidation) {
    this.#formElem = formEl;
    this.validation = validation;
    // this.#init();
  }

  // #init() {
  //   this.#formElem?.addEventListener("submit", this.#handleLogin.bind(this));
  // }

  handleLogin(e: SubmitEvent) {
    e.preventDefault();

    console.log("uuuu");
    // this.validation.validate();
    // if (this.validation.errors.length > 0) return;
  }
}


const [formElem, inputPasswordElem, btn, errorElem] = [
  "form",
  "password",
  "submit",
  "error",
].map((item) => document.getElementById(item));

// const validation = new ValidationLogin({ inputPasswordElem, errorElem });

// export const formSubmition = new FormSubmit({ formElem }, validation);
// export const formSubmition = new FormSubmit({ formElem });

