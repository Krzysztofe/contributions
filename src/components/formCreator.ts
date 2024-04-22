import { ValidationUni } from "../utils/validationUni.ts";

import { getFormValues } from "../utils/getFormValues.ts";

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

  handleChangeInput(e: any) {
    const inputValue = e.target.value;
    const members = document.querySelectorAll("[data='member']");

    members.forEach(member => {
      const memberTexContent = member?.textContent ?? "";
      const match = new RegExp(inputValue, "i").test(memberTexContent);

      if (member && member.parentElement) {
        member.parentElement.classList.toggle("hidden", !match);
      }
    });
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
    type === "password" && input.setAttribute("autocomplete", "username");
    input.classList.add(
      "input",
      "input-bordered",
      "focus:border-accent",
      "focus:outline-none",
      "input-sm",
      "w-full",
      "max-w-xs",
      "rounded-sm",
      "placeholder-black",
      ...inputStyles
    );

    if (type === "search") {
      input.addEventListener("input", this.handleChangeInput.bind(this));
    }

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

        const inputs = this.createInput(
          { name, type, required, placeholder, errorMsg, pattern },
          inputStyles
        );

        field.append(inputs);

        if (required) {
          const error = document.createElement("div");
          error.id = `${name}Error`;
          error.classList.add("text-xs", "h-4", "text-red-500", "mb-1");
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
    btnEl.classList.add(
      "btn",
      "btn-primary",
      "btn-sm",
      "rounded-sm",
      "text-white",
      ...btnStyles
    );

    const btnInnerEl = document.createElement("div");
    btnInnerEl.innerText = "Zapisz";
    btnInnerEl.classList.add("absolute", "invisible");
    btnEl.append(btnInnerEl);

    this.#formEl?.append(btnEl);
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    // const elementID = (e.currentTarget as HTMLFormElement)?.id;
    // // const formEl = document.getElementById(elementID) as HTMLFormElement;
    const elementsu = getFormValues(e);
    const elements = Object.keys(getFormValues(e));
    console.log("", elementsu);
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
