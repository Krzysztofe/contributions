import { FormSubmit } from "../pages/login/loginSubmit.ts";
import { ValidationLogin } from "../pages/login/validation.ts";

export class FormCreator {
  #parentEl: HTMLElement | null;
  #formEl: HTMLFormElement | null = null;

  constructor(element: string) {
    this.#parentEl = document.getElementById(element);
  }

  createForm(formStyles: string[]) {
    this.#formEl = document.createElement("form");
    this.#formEl.id = "form";
    this.#formEl.classList.add(...formStyles);
    this.#formEl.setAttribute("novalidate", "");
    this.#parentEl?.prepend(this.#formEl);
  }

  createInput(
    { name, type, required, placeholder }: any,
    inputStyles: string[] = []
  ) {
    const input = document.createElement("input");
    input.id = name;
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("required", required || false);
    input.setAttribute("placeholder", placeholder);
    input.classList.add(
      "px-2",
      "py-1",
      "border",
      "border-gray-300",
      "focus:border-blue-500",
      "focus:outline-none",
      "placeholder-black",
      ...inputStyles
    );
    input.style.cssText = `
      ::placeholder {
        color: red; 
      }
    `;
    return input;
  }

  createFields(
    inputsData: any[],
    fieldStyles: string[] = [],
    inputStyles: string[] = []
  ) {
    inputsData.forEach(({ name, type, required, placeholder, label }: any) => {
      const field = document.createElement("div");
      field.classList.add(...fieldStyles);

      if (label) {
        const labelEl = document.createElement("label");
        labelEl.innerText = label;
        labelEl.setAttribute("for", name);
        field.append(labelEl);
      }

      field.append(
        this.createInput({ name, type, required, placeholder }, inputStyles)
      );

      if (required) {
        const error = document.createElement("div");
        error.id = `${name}Error`;
        error.classList.add("text-xs", "h-3", "text-red-500", "mb-1");
        field.append(error);
      }

      this.#formEl?.append(field);
    });
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
