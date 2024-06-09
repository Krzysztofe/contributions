export class PopupCreator {
  protected bodyEl = document.querySelector("body");
  protected popupContainer = document.createElement("div");

  constructor() {
    this.#removePopupEvent();
  }

  protected createPopupContainetr() {
    this.bodyEl?.classList.add("overflow-hidden");
    this.popupContainer.id = "popupContainer";
    this.popupContainer.setAttribute("data", "popup-container");
    this.popupContainer.classList.add(
      "fixed",
      "top-0",
      "w-screen",
      "h-screen",
      "bg-black_opacity",
      "overflow-y-scroll",
      "z-50"
    );
    this.bodyEl?.append(this.popupContainer);
  }

  #removePopup(e: Event) {
    const eventTarget = e.target as HTMLElement;

    if (
      eventTarget?.classList.value.includes("bg-black_opacity") ||
      eventTarget?.classList.value.includes("fa-xmark")
    ) {
      this.popupContainer?.remove();
    }
  }
  #removePopupEvent() {
    this.popupContainer?.addEventListener(
      "click",
      this.#removePopup.bind(this)
    );
  }
}
