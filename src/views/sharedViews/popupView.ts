import { iconX } from "../../icons/iconX";

export class PopupView {
  protected bodyEl = document.querySelector("body");
  protected popupContainer: HTMLDivElement | null = null;

  constructor() {}

   createPopupContainetr() {
    this.popupContainer?.remove();
    this.popupContainer = document.createElement("div");
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

    const innerContainer = document.createElement("div");
    innerContainer.id = "popupInnerContainer";
    innerContainer.classList.add(
      "px-10",
      "py-8",
      "sm:border",
      "w-[90%]",
      "sm:w-96",
      "m-auto",
      "rounded-sm",
      "bg-white",
      "relative",
      "mt-14"
    );

    const xmarkBtn = document.createElement("button");
    xmarkBtn.innerHTML = iconX;
    xmarkBtn.classList.add(
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
    xmarkBtn.setAttribute("data-icon-xmark", "");

    innerContainer.prepend(xmarkBtn);
    this.popupContainer.append(innerContainer);
    this.bodyEl?.append(this.popupContainer);
    this.bodyEl?.classList.add("overflow-hidden");

    this.popupContainer.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("bg-black_opacity") ||
        target.hasAttribute("data-icon-xmark")
      ) {
        this.popupContainer?.remove();
        this.popupContainer = null;
        this.bodyEl?.classList.remove("overflow-hidden");
      }
    });
  }
}
