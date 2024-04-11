export class LoadigPageCreator {
  #body: HTMLElement | null;
  #container: HTMLElement | null = null;

  constructor() {
    this.#body = document.querySelector("body");
    this.#createContainer();
    this.#createSpinner();
    this.#init();
  }

  #init() {
    this.#loadingEvent();
  }

  #createContainer() {
    const container = document.createElement("div");
    container.classList.add(
      "grid",
      "place-content-center",
      "h-full",
      "bg-white",
      "fixed",
      "top-0",
      "left-0",
      "right-0",
      "opacity-100"
    );
    container.style.transition = "opacity 1000ms";
    this.#body?.prepend(container);
    this.#container = container;
  }

  #createSpinner() {
    const spinner = document.createElement("span");
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-lg",
      "text-primary"
    );
    this.#container?.append(spinner);
  }
  #handleLoad() {
    if (this.#container) {
      this.#container.style.opacity = "0";
      this.#container.style.display = "none";
    }
  }
  #loadingEvent() {
    window.addEventListener("load", this.#handleLoad.bind(this));
  }
}
