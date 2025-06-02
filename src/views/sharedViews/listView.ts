export class ListView {
  #parentEl: HTMLElement | null;
  protected ulEl = document.createElement("ul");

  constructor(parentEl: string) {
    this.#parentEl = document.querySelector(parentEl);
    this.#createUl();
  }

  #createUl() {
    this.ulEl.classList.add("flex");
    this.#parentEl?.append(this.ulEl);
  }
}
