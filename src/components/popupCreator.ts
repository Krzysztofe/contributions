import { iconX } from "../icons/iconX";

export class PopupCreator {
  protected bodyEl = document.querySelector("body");
  #xmarkEL = document.createElement("button");
  #innerContainerEl = document.createElement("div");
  protected popupContainer = document.createElement("div");

  constructor() {
    this.#removePopupEvent();
  }

  #createIconXmark() {
    this.#xmarkEL.innerHTML = iconX;
    this.#xmarkEL.classList.add(
      "absolute",
      "top-2",
      "right-2",
      "w-6",
      "h-6",
      "flex",
      "items-center",
      "p-1",
      "cursor-pointer",
      "fill-dark",
      "aspect-square",
      "rounded-full",
      "hover:bg-hover_bg"
    );
    this.#innerContainerEl?.prepend(this.#xmarkEL);
  }

  #createPopupInnerContainer() {
    this.#innerContainerEl.id = "popupInnerContainer";
    this.#innerContainerEl.classList.add(
      "px-16",
      "py-8",
      "sm:border",
      "max-w-96",
      "m-auto",
      "rounded-sm",
      "bg-white",
      "relative",
      "mt-14"
    );

    this.popupContainer.append(this.#innerContainerEl);
    this.#createIconXmark();
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
    this.#createPopupInnerContainer();
  }

  #handleRremovePopup(e: Event) {
    const eventTarget = e.target as HTMLElement;

    if (
      eventTarget?.classList.value.includes("bg-black_opacity") ||
      eventTarget?.hasAttribute("data-icon-xmark")
    ) {
      this.popupContainer?.remove();
    }
  }
  #removePopupEvent() {
    this.popupContainer?.addEventListener(
      "click",
      this.#handleRremovePopup.bind(this)
    );
  }
}
