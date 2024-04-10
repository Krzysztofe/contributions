export class ValidationUni {
  inputsElements: any;
  errorsElements: any;
  errors: string[] = [];
  constructor(objectKeys: string[]) {
    this.inputsElements = {};
    this.errorsElements = {};

    objectKeys.forEach((key: string) => {
      this.inputsElements[key] = document.getElementById(key);
    });

    objectKeys.forEach((key: string) => {
      this.errorsElements[`${key}Error`] = document.getElementById(
        `${key}Error`
      );
    });

    this.errors = [];
  }

  validation() {
    const inputsElements = Object.values(this.inputsElements);
    inputsElements.forEach((inputEl: any) => {
      const patternStr = inputEl.getAttribute("data-pattern");
      const pattern = new RegExp(patternStr, "u");


      if (!pattern.test(inputEl?.value.trim())) {
        const errorEl = `${inputEl.id}Error`;

        this.errorsElements[errorEl].innerText =
          this.errorsElements[errorEl].getAttribute("data-error");

        this.errors.push("error");
      } else {
        const errorEl = `${inputEl.id}Error`;
        this.errorsElements[errorEl].innerText = "";
      }
    });
  }
}
