export class LoadingSpinner {
  #parentEl: HTMLButtonElement | null;
  #spinner: HTMLElement | null = null;

  constructor(elementId: string) {
    this.#parentEl = document.querySelector(elementId) as HTMLButtonElement;
  }

  createSpinner() {
    const spinner = document.createElement("div");
    spinner.innerText = "ppppp";
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-xs",
      "absolute",
      "hidden",
      "md:block",
      "top-0.5",
      "-left-10",
      "text-grey_primary",
      "z-50"
    );
    console.log("aaaa", this.#parentEl);
    this.#parentEl?.parentNode?.insertBefore(spinner, this.#parentEl);
    this.#parentEl && (this.#parentEl.disabled = true);
    this.#spinner = spinner;
  }

  removeSpinner() {
    this.#spinner?.remove();

    if (this.#parentEl) {
      this.#parentEl.disabled = false;
    }
  }
}
