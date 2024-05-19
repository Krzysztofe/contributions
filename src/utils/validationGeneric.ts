export class ValidationGeneric {
  inputsElements: { [key: string]: HTMLInputElement } = {};
  errorsElements: { [key: string]: HTMLElement } = {};
  errors: string[] = [];

  constructor(objectKeys: string[]) {
    objectKeys.forEach((key: string) => {
      this.inputsElements[key] = document.getElementById(
        key
      ) as HTMLInputElement;
    });
    objectKeys.forEach((key: string) => {
      const errorElement = document.getElementById(`${key}Error`);

      if (errorElement) {
        this.errorsElements[`${key}Error`] = errorElement;
      }
    });

    this.errors = [];
    this.validation();
  }
  
  validation() {
    const inputsElements = Object.values(this.inputsElements);
    inputsElements.forEach((inputEl: any) => {
      const patternStr = inputEl.getAttribute("data-regEx");
      const pattern = new RegExp(patternStr, "u");
      const errorEl = `${inputEl.id}Error`;

      if (inputEl?.value.trim().length === 0) {
        this.errorsElements[errorEl].innerText = "Wymagne";
        this.errors.push("error");
      } else if (!pattern.test(inputEl?.value.trim())) {
        const errorElement = this.errorsElements[errorEl];
        if (errorElement) {
          const dataError = errorElement.getAttribute("data-error");
          if (dataError) {
            errorElement.innerText = dataError;
          }
          this.errors.push("error");
        }
      } else {
        const errorEl = `${inputEl.id}Error`;
        this.errorsElements[errorEl].innerText = "";
      }
    });
  }
}
