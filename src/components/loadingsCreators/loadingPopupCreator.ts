export class LoadingPopupCreator {
  #parentEl: HTMLElement | null = null;

  constructor(parentRef: string) {
    this.#parentEl = document.querySelector(parentRef);
  }

  createSpinner() {
    const spinner = document.createElement("div");
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-lg",
      "text-accent",
      "text-center"
    );
    this.#parentEl?.append(spinner);
  }

  removeLoading() {
    this.#parentEl?.remove();
  }
}
