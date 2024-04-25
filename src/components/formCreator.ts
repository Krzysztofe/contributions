import { ValidationUni } from "../utils/validationUni.ts";
import { HttpRequest } from "../services/httpRequest.ts";
import { URL_Members } from "../data/dataUrl.ts";
import { getFormValues } from "../utils/getFormValues.ts";
import { LoadingButtonCreator } from "./loadings/loadingButtonCreator.ts";

export const createLoader = () => {
  const div = document.createElement("div");
  div.id = "loader";
  div.innerText = "lllllllllllll";
  document.querySelector("body")?.append(div);
};

export const removeLoader = () => {
  const div = document.getElementById("loader");
  div?.remove();
  // div?.classList.add("hidden");
};

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
    btnEl.id = "btnSubmit";
    btnEl.innerText = innerText;
    btnEl.classList.add(
      "btn",
      "bg-accent",
      "hover:bg-accent_light",
      "btn-sm",
      "rounded-sm",
      "text-white",
      "relative",
      ...btnStyles
    );

    const btnInnerEl = document.createElement("div");
    btnInnerEl.innerText = innerText;
    btnInnerEl.classList.add("absolute", "invisible");
    btnEl.append(btnInnerEl);

    this.#formEl?.append(btnEl);
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    // const elementID = (e.currentTarget as HTMLFormElement)?.id;
    // // const formEl = document.getElementById(elementID) as HTMLFormElement;
    // const elementsu = getFormValues(e);
    // console.log('',elementsu)
    const elements = Object.keys(getFormValues(e));
    const uni = new ValidationUni(elements);
    uni.validation();
    if (uni.errors.length > 0) return;

    const request = new HttpRequest();
    const loader = new LoadingButtonCreator("btnSubmit");
    loader.createSpinner();
    request.sendRequest(URL_Members).then(requestValues => {
      if (requestValues?.isLoading === false) {
        loader.removeSpinner();
      }
    });
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
