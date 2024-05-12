export class LoadingX {
  #parentEl: HTMLElement | null;
  #loadingContainer: HTMLElement | null = null;

  constructor(parentEL: string) {
    this.#parentEl = document.querySelector(parentEL);
    this.#createSpinner();
  }

  #createSpinner() {
    const spinner = document.createElement("div");
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-lg",
      "text-accent"
    );

    this.#loadingContainer?.append(spinner);
  }

  createLoadigContainer() {
    const container = document.createElement("div");
    container.classList.add(
      "grid",
      "place-content-center",
      "h-full",
      "w-full",
      "bg-white_opacity",
      "absolute",
      "top-0",
      "left-0",
      "z-50"
    );
    this.#loadingContainer = container;
    this.#createSpinner();
    this.#parentEl?.prepend(container);
  }

  removeLoadingContainer() {
    this.#loadingContainer?.remove();
  }
}
