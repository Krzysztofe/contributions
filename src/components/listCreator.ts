export class ListCreator {
  protected ulEl: HTMLUListElement | null = null;
  #parentEl: HTMLElement | null;

  constructor(parentEl: string) {
    this.#parentEl = document.querySelector(parentEl);
    this.#createUl();
  }

  #createUl() {
    this.ulEl = document.createElement("ul");
    this.ulEl.classList.add("flex");
    this.#parentEl?.append(this.ulEl);
  }
}
