export class LoadigPageCreator {
  #body: HTMLElement | null;
  #container: HTMLElement | null = null;
  #spinner: HTMLElement | null = null;

  constructor() {
    this.#body = document.querySelector("body");
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
      "opacity-100",
      "z-50",
      "loadingContainer"
    );
    container.style.transition = "opacity 500ms";

    document.documentElement.insertBefore(container, this.#body);
    this.#container = container;
  }

  #createSpinner() {
    const spinner = document.createElement("span");
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-lg",
      "text-accent"
    );
    this.#container?.append(spinner);
    this.#spinner = spinner;
  }
  #handleDOMLoad() {
    this.#createContainer();
    this.#createSpinner();
  }

  #handleLoad() {
    if (this.#body) {
      this.#body.style.display = "block";
    }

    if (this.#container && this.#body) {
      this.#container.style.opacity = "0";
    }
    this.#spinner?.remove();

    setTimeout(() => {
      this.#container?.classList.add("hidden")
    }, 500);
  }

  #loadingEvent() {
    window.addEventListener("DOMContentLoaded", this.#handleDOMLoad.bind(this));
    window.addEventListener("load", this.#handleLoad.bind(this));
  }
}
