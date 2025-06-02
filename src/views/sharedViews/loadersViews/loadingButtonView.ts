export class LoadingButtonView {
  #parentEl: HTMLButtonElement | null;
  #spinner: HTMLElement | null = null;

  constructor(parentEL: string) {
    this.#parentEl = document.getElementById(parentEL) as HTMLButtonElement;
  }

  createSpinner() {
    const spinner = document.createElement("span");
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-xs",
      "text-grey_primary",
      "absolute",
    );

    if (this.#parentEl) {
      this.#parentEl.disabled = true;
    }
    this.#parentEl?.append(spinner);
    this.#spinner = spinner;
  }

  removeSpinner() {
    this.#spinner?.remove();

    if (this.#parentEl) {
      this.#parentEl.disabled = false;
    }
  }
}
