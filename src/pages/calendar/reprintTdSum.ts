export class ReprintTdSum {
  #tdChanged: HTMLElement | null = null;

  constructor(tdDataAtributeId: string | null) {
    this.#tdChanged = document.querySelector(
      `[data-month-id="${tdDataAtributeId}"]`
    );

    this.#updateTdSum();
  }

  #updateTdSum() {
    const trEl = this.#tdChanged?.parentElement;
    const tdSumEl = this.#tdChanged?.parentElement
      ?.lastChild as HTMLElement | null;
    const currentSum = tdSumEl?.textContent?.replace("zł", "").trim();
    const sumToPay = tdSumEl?.getAttribute("data-sum-to-pay");
    const amountElems = trEl?.querySelectorAll("[data=amount]");

    const sum = Array.from(amountElems || [])
      ?.map(elem => {
        const amounts = elem.textContent?.replace("zł", "").trim();
        return amounts ? parseInt(amounts) : 0;
      })
      .reduce((sum, curr) => sum + curr);

    if (!currentSum || sumToPay === null || sumToPay === undefined) return;

    const newSum = sum - parseInt(sumToPay);
    let innerText;
    if (newSum < 0) {
      innerText = `${newSum} zł`;
    } else if (newSum > 0) {
      innerText = `+${newSum} zł`;
    } else if (newSum === 0) {
      innerText = `\u00A0 ${newSum} zł`;
    }

    tdSumEl?.classList.toggle("text-danger", newSum < 0);
    tdSumEl?.classList.toggle("text-dark", newSum >= 0);
    tdSumEl && (tdSumEl.innerText = "");
    tdSumEl && innerText && (tdSumEl.innerText = innerText);
  }
}
