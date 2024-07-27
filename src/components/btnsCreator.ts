export class BtnsCreator {
  #btsContainerEl = document.createElement("div");
  #parentEl: HTMLElement | null = null;
  #popupContainer = document.getElementById("popupContainer");

  constructor(parentRef: string) {
    this.#parentEl = document.querySelector(parentRef);
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
      "text-white",
      "text-center",
      "btn-sm",
      "px-8",
    ];
    this.#createBtn("Tak", [
      ...btnStyles,
      "bg-accent",
      "hover:opacity-50",
      "hover:bg-accent",
    ]);
    this.#createBtn("Nie", [...btnStyles, "bg-grey_primary"]);
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
      .getElementById("Nie")
      ?.addEventListener("click", this.#handleRemovePopup.bind(this));
  }
}
