export class MemberEditSubmit {
  #formEl = document.querySelector("form");
  constructor() {
    this.#submitEvent();
  }

  #handleSubmit(e: Event) {
    e.preventDefault();
  }
  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
