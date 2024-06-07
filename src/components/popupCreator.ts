export class PopupCreator {
  protected bodyEl = document.querySelector("body");
  #popupContainer = document.createElement("div");

  protected createPopupContainetr() {
    this.bodyEl?.classList.add("overflow-hidden");
    this.#popupContainer.setAttribute("data", "popup-container");
    this.#popupContainer.classList.add(
      "fixed",
      "top-0",
      "w-screen",
      "h-screen",
      "bg-black_opacity",
      "overflow-y-scroll",
      "z-50"
    );
  }
}
