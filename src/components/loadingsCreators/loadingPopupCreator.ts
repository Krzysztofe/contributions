export class LoadingPopupCreator {
  #spinnerEl: HTMLElement | null = null;
  #parentEl: HTMLElement | null = null;

  constructor(parentRef: string) {
    this.#parentEl = document.querySelector(parentRef);
  }

  createSpinner() {
    this.#spinnerEl = document.createElement("div");
     this.#spinnerEl.classList.add(
       "loading",
       "loading-spinner",
       "loading-lg",
       "text-accent",
       "margin-auto"
     );
    this.#parentEl?.append(this.#spinnerEl);
  }

  removeLoading() {
      this.#spinnerEl?.remove();
  }
}
