import { StateAmount } from "../states/StateAmount";

export class ReprintAmountInMontch {
  #eTarget: string | null = null;
  #elemsInTd: NodeListOf<HTMLElement> | null = null;
  #amountEl: HTMLElement | null = null;

  constructor(eTarget: HTMLElement) {
    this.#eTarget = eTarget.getAttribute("data-month-id");

    this.#elemsInTd = document.querySelectorAll(
      `[data-month-id="${this.#eTarget}"]`
    );

    this.#amountEl = this.#elemsInTd[1];
    this.#reprintAmountInnerText();
  }
  #reprintAmountInnerText() {
    this.#amountEl && (this.#amountEl.innerText = `${StateAmount.amount} zł`);

    const firstElem = this.#elemsInTd?.[0];
    if (firstElem) {
      const isAmountZero = parseInt(StateAmount.amount) === 0;
      firstElem.classList.toggle("bg-td_red", isAmountZero);
      firstElem.classList.toggle("inherit", !isAmountZero);
    }
  }
}
