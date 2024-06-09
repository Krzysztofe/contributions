type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export class ValidationGeneric {
  inputsElems: { [key: string]: HTMLInputElement } = {};
  errorsElems: { [key: string]: HTMLElement } = {};
  errors: string[] = [];

  constructor(objectKeys: string[]) {
    objectKeys.forEach((key: string) => {
      this.inputsElems[key] = document.getElementById(key) as HTMLInputElement;
    });
    objectKeys.forEach((key: string) => {
      const errorElement = document.getElementById(`${key}Error`);

      if (errorElement) {
        this.errorsElems[`${key}Error`] = errorElement;
      }
    });

    this.errors = [];
    this.validation();
  }

  validation() {
    const inputsElems = Object.values(this.inputsElems);

    inputsElems.forEach((inputEl: InputElement) => {
      const patternStr = inputEl.getAttribute("data-regEx");

      if (!patternStr) return;

      const pattern = new RegExp(patternStr, "u");
      const errorEl = `${inputEl.id}Error`;

      if (inputEl?.value.trim().length === 0) {
        this.errorsElems[errorEl].innerText = "Wymagne";
        this.errors.push("error");
      } else if (!pattern.test(inputEl?.value.trim())) {
        const errorElement = this.errorsElems[errorEl];
        console.log('',errorElement)
        if (errorElement) {
          const dataError = errorElement.getAttribute("data-error");
          if (dataError) {
            errorElement.innerText = dataError;
          }
          this.errors.push("error");
        }
      } else {
        const errorEl = `${inputEl.id}Error`;
        this.errorsElems[errorEl].innerText = "";
      }
    });
  }
}
