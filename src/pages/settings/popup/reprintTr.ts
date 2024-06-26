export class ReprintTr {
  #trEl: HTMLElement | null = null;
  #tdElems: NodeListOf<HTMLElement> | null = null;
  #phone: string | null | undefined = null;

  constructor(
    trId: string | null | undefined,
    phone: string | null | undefined
  ) {
    this.#trEl = trId ? document.getElementById(trId) : null;
    this.#phone = phone;
    this.reprintTrEl();
    this.#trBgColor();
  }

  #trBgColor() {
    if (!this.#trEl) return;

    this.#trEl.classList.add("animateTr");

    setTimeout(() => {
      this.#trEl?.classList.remove("animateTr");
    }, 400);
  }

  reprintTrEl() {
    if (!this.#trEl) return;

    this.#tdElems = this.#trEl.querySelectorAll<HTMLTableCellElement>("td");

    if (this.#tdElems && this.#phone) {
      this.#tdElems[2].innerText = this.#phone;
    }
  }
}
