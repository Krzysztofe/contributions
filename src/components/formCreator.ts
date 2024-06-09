type ModelInputData = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  errorMsg: string;
  regEx: string;
};
type ModelCreateForm = { formId: string; styles: string[] };
type ModelCreateInput = Omit<ModelInputData, "label" | "errorMsg">;
type ModelCreateFields = {
  inputsData: ModelInputData[];
  fieldStyles?: string[];
  inputStyles?: string[];
};

export class FormCreator {
  #parentEl: HTMLElement | null;
  protected formEl = document.createElement("form");
  #fieldEl: HTMLElement | null = null;
  #labelEl: HTMLElement | null = null;
  #inputEl: HTMLInputElement | HTMLTextAreaElement | null = null;
  #errorEl: HTMLElement | null = null;
  #btnEl = document.createElement("button");
  #membersElems: NodeListOf<Element> | null = null;

  constructor(elementId: string) {
    this.#parentEl = document.getElementById(elementId);
  }

  createForm({ formId, styles }: ModelCreateForm) {
    this.formEl.id = formId;
    this.formEl.classList.add(...styles);
    this.#parentEl?.prepend(this.formEl);
  }

  createInput(
    { name, type, placeholder, regEx }: ModelCreateInput,
    inputStyles: string[] = []
  ) {
    this.#inputEl =
      type === "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");
    this.#inputEl.id = name;
    this.#inputEl.setAttribute("type", type);
    this.#inputEl.setAttribute("name", name);
    this.#inputEl.setAttribute("placeholder", placeholder);
    this.#inputEl.setAttribute("data-regEx", regEx);
    type === "password" &&
      this.#inputEl.setAttribute("autocomplete", "username");
    const textAreaStyles =
      type === "textarea" ? ["textarea", "textarea-bordered", "py-0"] : [];

    this.#inputEl.classList.add(
      "input",
      "input-bordered",
      "focus:border-accent",
      "focus:outline-none",
      "input-sm",
      "bg-grey_light",
      "max-w-xs",
      "rounded-sm",
      "placeholder-black",
      ...textAreaStyles,
      ...inputStyles
    );

    this.#inputEvents(type);
    this.#addInputProperties(type);

    if (name === "login") {
      this.#inputEl.value = import.meta.env.VITE_LOGIN;
    }

    if (name === "password") {
      this.#inputEl.value = import.meta.env.VITE_PASSWORD;
    }

    return this.#inputEl;
  }

  #addInputProperties(inputType: string) {
    if (!this.#inputEl) return;
    if (inputType === "date") {
      this.#inputEl.style.textTransform = "none";
    }

    if (inputType === "number") {
      this.#inputEl.setAttribute("min", "0");
    }
  }

  #createLabel({ name, type, label }: ModelInputData): HTMLElement {
    this.#labelEl = document.createElement("label");
    this.#labelEl.innerText = label;
    this.#labelEl.setAttribute("for", name);

    if (type === "date" || type === "month") {
      this.#labelEl.classList.add(
        "px-3",
        "py-[5px]",
        "absolute",
        "top-0",
        "w-full",
        "border",
        "border-stone-300",
        "rounded-sm",
        "bg-grey_light",
        "text-sm",
        "cursor-text"
      );
      this.#labelEl.addEventListener("click", () =>
        this.#labelEl?.classList.add("-z-10")
      );
    }

    return this.#labelEl;
  }

  #createError({ name, errorMsg }: ModelInputData): HTMLElement {
    this.#errorEl = document.createElement("div");
    this.#errorEl.id = `${name}Error`;
    this.#errorEl.classList.add("text-xs", "h-4", "text-red-500", "mb-1");
    this.#errorEl.setAttribute("data-error", errorMsg);

    return this.#errorEl;
  }

  createBtn({ innerText, styles }: { innerText: string; styles: string[] }) {
    this.#btnEl.setAttribute("type", "submit");
    this.#btnEl.id = "btnSubmit";
    this.#btnEl.innerText = innerText;
    this.#btnEl.classList.add(
      "btn",
      "bg-accent",
      "hover:bg-accent_light",
      "btn-sm",
      "rounded-sm",
      "text-white",
      "relative",
      ...styles
    );

    this.formEl?.append(this.#btnEl);
  }

  #createField(
    inputData: ModelInputData,
    fieldStyles: string[],
    inputStyles: string[]
  ): HTMLElement {
    this.#fieldEl = document.createElement("div");
    this.#fieldEl.classList.add("relative", ...fieldStyles);

    if (inputData.label) {
      const labelEl = this.#createLabel(inputData);
      this.#fieldEl.append(labelEl);
    }

    const inputEl = this.createInput(inputData, inputStyles);
    this.#fieldEl.append(inputEl);

    if (inputData.errorMsg) {
      const errorEl = this.#createError(inputData);
      this.#fieldEl.append(errorEl);
    }

    return this.#fieldEl;
  }

  createFields({
    inputsData,
    fieldStyles = [],
    inputStyles = [],
  }: ModelCreateFields) {
    inputsData.forEach(inputData => {
      const fieldEl = this.#createField(inputData, fieldStyles, inputStyles);
      this.formEl?.append(fieldEl);
    });
  }

  #handleChangeInputSearch(e: Event) {
    const inputValue = (e.target as HTMLInputElement).value;
    this.#membersElems = document.querySelectorAll("[data='member']");

    this.#membersElems.forEach(member => {
      const memberTexContent = member?.textContent ?? "";
      const match = new RegExp(inputValue, "i").test(memberTexContent);

      if (member && member.parentElement) {
        member.parentElement.classList.toggle("hidden", !match);
      }
    });
  }

  #handlePhoneFormat(e: Event) {
    const eTarget = e.target as HTMLInputElement;
    const inputValue = eTarget.value.replace(/-/g, "");
    const formattedValue = inputValue.replace(/(\d{3})(?=\d)/g, "$1-");
    eTarget.value = formattedValue;
  }

  #inputEvents(inputType: string) {
    if (!this.#inputEl) return;

    if (inputType === "search") {
      this.#inputEl.addEventListener(
        "input",
        this.#handleChangeInputSearch.bind(this)
      );
    }

    if (inputType === "tel") {
      this.#inputEl.addEventListener(
        "input",
        this.#handlePhoneFormat.bind(this)
      );
    }
  }
}
