export class LoadingTdView {
  #tdEl: HTMLElement | null = null;
  #spinner: HTMLElement | null = null;

  constructor(elem: HTMLElement) {
    this.#tdEl = elem;
  }
  createSpinner() {
    const spinner = document.createElement("div");
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-xs",
      "absolute",
      "top-[50%]",
      "left-[50%]",
      "-translate-y-2/4",
      "-translate-x-2/4",
      "text-grey_primary",
      "z-50"
    );
    this.#spinner = spinner;
    this.#tdEl?.append(this.#spinner);
  }
  removeSpinner() {
    this.#spinner?.remove()
  }
}
