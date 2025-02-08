export class BtnsCreator {
  #btsContainerEl = document.createElement("div");
  #parentEl: HTMLElement | null = null;
  #popupContainer = document.getElementById("popupContainer");
  #actionText: string

  constructor(parentRef: string, actionText: string) {
    this.#parentEl = document.querySelector(parentRef);
    this.#actionText = actionText;
    this.#createButtonsContainer();
    this.#removePopupEvent();
  }

  #createButtonsContainer() {
    document.getElementById("btnsContainer")?.remove();
    this.#btsContainerEl.classList.add(
      "flex",
      "justify-center",
      "gap-8",
      "mt-5"
    );
    this.#btsContainerEl.id = "btnsContainer";
    this.#parentEl?.append(this.#btsContainerEl);
    const btnStyles = [
      "btn",
      "btn-sm",
      "rounded-sm",
      "text-center",
      "btn-sm",
      "px-8",
    ];
    this.#createBtn("Anuluj", [
      ...btnStyles,
      "text-accent",
      "bg-white",
      "border-1",
      "border-accent",
      "opacity-50",
      "hover:text-accent_light",
      "hover:border-accent_light",
      "hover:bg-white",
    ]);
    this.#createBtn(this.#actionText, [
      ...btnStyles,
      "text-white",
      "border-1",
      "border-accent",
      "bg-accent",
      "hover:border-accent_light",
      "hover:bg-accent_light",
    ]);
  }
  #createBtn(text: string, styles: string[]) {
    const btnEl = document.createElement("button");
    btnEl.id = text;
    btnEl.innerText = text;
    btnEl.classList.add(...styles);
    this.#btsContainerEl.append(btnEl);
  }

  #handleRemovePopup() {
    this.#popupContainer?.remove();
  }

  #removePopupEvent() {
    document
      .getElementById("Anuluj")
      ?.addEventListener("click", this.#handleRemovePopup.bind(this));
  }
}
