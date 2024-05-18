export class LoadigPageCreator {
  #loadingContenerEl = document.getElementById("loadingConteiner");
  constructor() {
    this.#loadingEvent();
  }

  #handleLoad() {
    this.#loadingContenerEl && (this.#loadingContenerEl.style.opacity = "0");

    setTimeout(() => {
      this.#loadingContenerEl?.classList.add("hidden");
    }, 200);
  }

  #loadingEvent() {
    window.addEventListener("load", this.#handleLoad.bind(this));
  }
}
