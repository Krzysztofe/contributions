

export class LoadigPageView {
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
    if (document.readyState === "complete") {
      this.#handleLoad();
    } else {
      window.addEventListener("load", this.#handleLoad.bind(this));
    }
  }
}


