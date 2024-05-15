export class ValidationUniversal {
  inputsElements: { [key: string]: HTMLInputElement | null };
  errorsElements: { [key: string]: HTMLElement | null };
  errors: string[] = [];

  constructor(objectKeys: string[]) {
    this.inputsElements = {};
    this.errorsElements = {};
    objectKeys.forEach((key: string) => {
      this.inputsElements[key] = document.getElementById(
        key
      ) as HTMLInputElement | null;
    });
    objectKeys.forEach((key: string) => {
      this.errorsElements[`${key}Error`] = document.getElementById(
        `${key}Error`
      );
    });

    this.errors = [];
    this.validation();
  }

  validation() {
    const inputsElements = Object.values(this.inputsElements);
    inputsElements.forEach((inputEl: HTMLInputElement | null) => {
      const patternStr = inputEl?.getAttribute("data-pattern");

      const pattern = patternStr && new RegExp(patternStr, "u");
      const errorEl = `${inputEl?.id}Error`;
      const errorElement = this.errorsElements[errorEl];

      if (inputEl && errorElement) {
        if (inputEl?.value.trim().length === 0) {
          errorElement.innerText = "Wymagne";

          this.errors.push("error");
        } else if (pattern && !pattern.test(inputEl?.value.trim())) {
          errorElement.innerText =
            errorElement.getAttribute("data-error") || "";

          this.errors.push("error");
        } else {
          errorElement.innerText = "";
        }
      }
    });
  }
}
