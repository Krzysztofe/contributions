export class ReprintTr {
  #trEl: any = null;
  #tdElems: NodeListOf<HTMLElement> | null = null;
  #phone: string | null | undefined = null;
  #join_date: string | null | undefined = null;

  constructor(
    trId: string | null | undefined,
    phone: string | null | undefined,
    join_date: string | null | undefined
  ) {
    this.#trEl = trId && document.getElementById(trId);
    this.#phone = phone;
    this.#join_date = join_date;
    this.reprintTrEl();
  }
  reprintTrEl() {
    this.#tdElems = this.#trEl.querySelectorAll("td");

    this.#tdElems && this.#phone && (this.#tdElems[2].innerText = this.#phone);
    this.#tdElems &&
      this.#join_date &&
      (this.#tdElems[3].innerText = this.#join_date);
  }
}
