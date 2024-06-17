export class LoadingInputCreator {
  #parentEl: HTMLElement | null;
  #spinner: HTMLElement | null = null;
  #inputEl = document.getElementById("defaultAmount") as HTMLInputElement

  constructor(parentEL: string) {
    this.#parentEl = document.getElementById(parentEL) 

  }
  createSpinner() {
    console.log('eeee',)
    const spinner = document.createElement("span");
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-xs",
      "text-grey_primary",
      "absolute",
      "top-[50%]",
      "left-[50%]",
      "-translate-y-2/4",
      "-translate-x-2/4",
    );

    if (this.#inputEl) {
      this.#inputEl.disabled = true;
    }
    this.#parentEl?.append(spinner);
    this.#spinner = spinner;
  }
  removeSpinner() {
    this.#spinner?.remove();

    if (this.#inputEl) {
      this.#inputEl.disabled = false;
    }
  }
}