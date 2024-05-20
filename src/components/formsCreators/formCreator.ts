type ModelInputData = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  errorMsg: string;
  regEx: string;
};

export class FormCreator {
  #parentEl: HTMLElement | null;
  formEl: HTMLFormElement | null = null;

  constructor(elementId: string) {
    this.#parentEl = document.getElementById(elementId);
  }

  createForm({ formId, styles }: { formId: string; styles: string[] }) {
    this.formEl = document.createElement("form");
    this.formEl.id = formId;
    this.formEl.classList.add(...styles);
    this.formEl.setAttribute("novalidate", "");
    this.#parentEl?.prepend(this.formEl);
  }

  handleChangeInput(e: Event) {
    const inputValue = (e.target as HTMLInputElement).value;
    const members = document.querySelectorAll("[data='member']");

    members.forEach(member => {
      const memberTexContent = member?.textContent ?? "";
      const match = new RegExp(inputValue, "i").test(memberTexContent);

      if (member && member.parentElement) {
        member.parentElement.classList.toggle("hidden", !match);
      }
    });
  }

  handlePhoneFormatting(e: Event) {
    const inputValue = (e.target as HTMLInputElement).value.replace(/-/g, "");
    const formattedValue = inputValue.replace(/(\d{3})(?=\d)/g, "$1-");
    (e.target as HTMLInputElement).value = formattedValue;
  }

  createInput(
    {
      name,
      type,
      placeholder,
      regEx,
    }: { name: string; type: string; placeholder: string; regEx: string },
    inputStyles: string[] = []
  ) {
    const input =
      type === "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");
    input.id = name;
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("data-regEx", regEx);
    type === "password" && input.setAttribute("autocomplete", "username");
    const textAreaStyles =
      type === "textarea" ? ["textarea", "textarea-bordered", "py-0"] : [];

    input.classList.add(
      "input",
      "input-bordered",
      "focus:border-accent",
      "focus:outline-none",
      "input-sm",
      "bg-white",
      "w-full",
      "max-w-xs",
      "rounded-sm",
      "placeholder-black",
      ...textAreaStyles,
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

    // if (type === "number") {
    //   input.value = "5";
    // }

    return input;
  }

  createFields({
    inputsData,
    fieldStyles = [],
    inputStyles = [],
  }: {
    inputsData: ModelInputData[];
    fieldStyles?: string[] | [];
    inputStyles?: string[] | [];
  }) {
    inputsData.forEach(
      ({ name, type, placeholder, label, errorMsg, regEx }) => {
        const field = document.createElement("div");
        field.classList.add("relative", ...fieldStyles);

        if (label) {
          const labelEl = document.createElement("label");
          labelEl.innerText = label;
          labelEl.setAttribute("for", name);
          field.append(labelEl);
          if (type === "date") {
            labelEl.classList.add(
              "px-3",
              "py-1",
              "absolute",
              "top-[1px]",
              "w-full",
              "border",
              "border-stone-300",
              "border-t-white",
              "border-b-white",
              "bg-white",
              "text-sm"
            );
           
            labelEl.addEventListener("click", () =>
              labelEl.classList.add("-z-10")
            );
          }
        }

        const inputs = this.createInput(
          { name, type, placeholder, regEx },
          inputStyles
        );

        field.append(inputs);

        if (errorMsg) {
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

  createBtn({ innerText, styles }: { innerText: string; styles: string[] }) {
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
      ...styles
    );

    this.formEl?.append(btnEl);
  }
}
