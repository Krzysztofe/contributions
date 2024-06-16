export class LoadingSpinner {
  #parentEl: HTMLButtonElement | null;
  #spinner: HTMLElement | null = null;

  constructor(parentEl: string) {
    this.#parentEl = document.querySelector(parentEl) as HTMLButtonElement;
  }

  createSpinner() {
    const spinner = document.createElement("div");
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
