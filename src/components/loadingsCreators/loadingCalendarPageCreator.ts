

export class LoadigCalendarPageCreator {
  #loadingContenerEl = document.getElementById("loadingConteiner");

  constructor() {
    this.handleLoad();
  }

  handleLoad() {
    
      this.#loadingContenerEl && (this.#loadingContenerEl.style.opacity = "0");

      setTimeout(() => {
        this.#loadingContenerEl?.classList.add("hidden");
      }, 200);
    
  }
}
