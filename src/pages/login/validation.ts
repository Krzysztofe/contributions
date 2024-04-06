export class ValidationLogin {
  #inputLoginEl: HTMLElement | null;
  #errorLoginEl: HTMLElement | null;
  #inputPasswordEl: HTMLElement | null;
  #errorPasswordEl: HTMLElement | null;
  #errors: string[] = [];

  constructor() {
    this.#inputLoginEl = document.getElementById("login");
    this.#errorLoginEl = document.getElementById("loginError");
    this.#inputPasswordEl = document.getElementById("password");
    this.#errorPasswordEl = document.getElementById("passwordError");
    this.#errors = [];
  }

  #validation() {
    if (
      this.#errorLoginEl &&
      this.#inputLoginEl instanceof HTMLInputElement &&
      this.#inputLoginEl.value.trim().length < 3
    ) {
      this.#errorLoginEl.innerText = "podaj login";
      this.#errors.push("error");
    } else if (this.#errorLoginEl) {
      this.#errorLoginEl.innerText = "";
    }

    if (
      this.#errorPasswordEl &&
      this.#inputPasswordEl instanceof HTMLInputElement &&
      this.#inputPasswordEl.value.trim().length < 3
    ) {
      this.#errorPasswordEl.innerText = "podaj hasło";
      this.#errors.push("error");
    } else if (this.#errorPasswordEl) {
      this.#errorPasswordEl.innerText = "";
    }
  }

  get errors() {
    return this.#errors;
  }

  validate() {
    this.#validation();
  }
}
