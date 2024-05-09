import { ValidationUniversal } from "../utils/validationUniversal.ts";
import { HttpRequest } from "../services/httpRequest.ts";
import { getFormValues } from "../utils/getFormValues.ts";
import { LoadingButtonCreator } from "./loadings/loadingButtonCreator.ts";
import { currentYear } from "../data/dataCurrentYear.ts";

export class FormCreator {
  #parentEl: HTMLElement | null;
  formEl: HTMLFormElement | null = null;

  constructor(elementId: string) {
    this.#parentEl = document.getElementById(elementId);
  }

  createForm(formId: string, formStyles: string[]) {
    this.formEl = document.createElement("form");
    this.formEl.id = formId;
    this.formEl.classList.add(...formStyles);
    this.formEl.setAttribute("novalidate", "");
    this.#parentEl?.prepend(this.formEl);
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

  handlePhoneFormatting(e: any) {
    const inputValue = e.target.value.replace(/-/g, "");
    const formattedValue = inputValue.replace(/(\d{3})(?=\d)/g, "$1-");
    e.target.value = formattedValue;
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

    if (type === "tel") {
      input.addEventListener("input", this.handlePhoneFormatting.bind(this));
    }

    if (name === "login") {
      input.value = import.meta.env.VITE_LOGIN;
    }
    if (name === "password") {
      input.value = import.meta.env.VITE_PASSWORD;
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

        this.formEl?.append(field);
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

    this.formEl?.append(btnEl);
  }
}

// Login Form

export class FormLogin extends FormCreator {
  printLoginError: HTMLElement | null = null;

  constructor(elementId: string) {
    super(elementId);
  }

  createLoginErrorMsg() {
    this.printLoginError = document.createElement("div");
    this.printLoginError.classList.add("text-xs", "h-4", "text-red-500");
    this.formEl?.append(this.printLoginError);
  }

  handleSubmit(e: SubmitEvent, url: string) {
    e.preventDefault();

    // Validation
    const elements = Object.keys(getFormValues(e));
    const validationLogin = new ValidationUniversal(elements);
    validationLogin.validation();
    if (validationLogin.errors.length > 0) return;

    // Request
    const { login, password } = getFormValues(e);
    const request = new HttpRequest();
    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();

    const requestOptions = {
      url,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: { login, password },
    };

    request.sendRequest(requestOptions).then(requestValues => {
      if (requestValues?.fetchedData) {
        localStorage.setItem("jwt", requestValues?.fetchedData);
        location.href = "/src/pages/calendar/calendar.html";
      } else {
        this.printLoginError &&
          (this.printLoginError.innerText = "Błędny login lub hasło");
      }

      if (requestValues?.isLoading === false) {
        btnLoader.removeSpinner();
      }
    });
  }

  submitEvent(url: string) {
    this.formEl?.addEventListener("submit", e => this.handleSubmit(e, url));
  }
}

// Member Form

export class FormCreateMember extends FormCreator {
  constructor(ElementId: string) {
    super(ElementId);
  }

  handleSubmit(e: SubmitEvent, url: string) {
    e.preventDefault();

    // Validation
    const elements = Object.keys(getFormValues(e));
    const uni = new ValidationUniversal(elements);
    uni.validation();
    if (uni.errors.length > 0) return;

    // Request
    const request = new HttpRequest();
    const loader = new LoadingButtonCreator("btnSubmit");
    loader.createSpinner();
    const requestOptions = {
      url,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: { name: "ala", surname: "looo", phone: 888 },
    };

    request.sendRequest(requestOptions).then(requestValues => {
      // console.log("", requestOptions);
      // console.log("", requestValues);
      if (requestValues?.isLoading === false) {
        loader.removeSpinner();
      }
    });
  }

  submitEvent(url: string) {
    this.formEl?.addEventListener("submit", e => this.handleSubmit(e, url));
  }
}
