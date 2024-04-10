
import { ValidationUni } from "./validationUni.ts";

import { getFormValues } from "./getFormValues.ts";

export class FormCreator {
  #parentEl: HTMLElement | null;
  #formEl: HTMLFormElement | null = null;

  constructor(element: string) {
    this.#parentEl = document.getElementById(element);
  }

  createForm(formId: string, formStyles: string[]) {
    this.#formEl = document.createElement("form");
    this.#formEl.id = formId;
    this.#formEl.classList.add(...formStyles);
    this.#formEl.setAttribute("novalidate", "");
    this.#parentEl?.prepend(this.#formEl);
  }

  createInput(
    { name, type, required, placeholder, pattern }: any,
    inputStyles: string[] = []
  ) {
    const input = document.createElement("input");
    input.id = name;
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("required", required || false);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("data-pattern", pattern);
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
    inputsData.forEach(
      ({
        name,
        type,
        required,
        placeholder,
        label,
        errorMsg,
        pattern,
      }: any) => {
        const field = document.createElement("div");
        field.classList.add(...fieldStyles);

        if (label) {
          const labelEl = document.createElement("label");
          labelEl.innerText = label;
          labelEl.setAttribute("for", name);
          field.append(labelEl);
        }

        field.append(
          this.createInput(
            { name, type, required, placeholder, errorMsg, pattern },
            inputStyles
          )
        );

        if (required) {
          const error = document.createElement("div");
          error.id = `${name}Error`;
          error.classList.add("text-xs", "h-3", "text-red-500", "mb-1");
          error.setAttribute("data-error", errorMsg);
          field.append(error);
        }

        this.#formEl?.append(field);
      }
    );
  }

  createBtn(innerText: string, btnStyles: string[]) {
    const btnEl = document.createElement("button");
    btnEl.setAttribute("type", "submit");
    btnEl.innerText = innerText;
    btnEl.classList.add(...btnStyles);
    this.#formEl?.append(btnEl);
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    // const elementID = (e.currentTarget as HTMLFormElement)?.id;
    // // const formEl = document.getElementById(elementID) as HTMLFormElement;
    // const elements = getFormValues(e);
    const elements = Object.keys(getFormValues(e));

    const uni = new ValidationUni(elements);
    uni.validation();

    // console.log("", uni.errorsElements);

    // formEl.reset();
  }

  submitEvent() {
    // const validation = new ValidationLogin();
    // const formSubmition = new FormSubmit(validation);
    // this.#formEl?.addEventListener(
    //   "submit",
    //   formSubmition.handleSubmit.bind(formSubmition)
    // );

    this.#formEl?.addEventListener("submit", this.handleSubmit.bind(this));
  }
}
