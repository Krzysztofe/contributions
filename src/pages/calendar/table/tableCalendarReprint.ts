import { Helpers } from "../../../utils/helpers";

export class TableCalendarReprint {
  #formValues: any = null;
  #monthDetails: string | null = null;
  #tdEl: HTMLElement | null = null;

  constructor(monthDetails: string | null, formValues: any) {
    this.#formValues = formValues;
    this.#monthDetails = monthDetails;
    this.#tdEl = document.querySelector(
      `[data-month-details="${monthDetails}"]`
    );
    this.#tdInnerHtml();
  }

  #tdInnerHtml() {
    this.#tdEl && (this.#tdEl.innerHTML = "");

    if (this.#tdEl && this.#monthDetails) {
      this.#tdEl.innerHTML = Helpers.tdInnerHtmlPattern(
        this.#formValues,
        this.#monthDetails
      );
      this.#tdBgColor();
    }
  }
  #tdBgColor() { 
// console.log('',this.#tdEl?.textContent?.trim())

    if (this.#tdEl?.textContent?.trim() === "0 zł") {
      this.#tdEl?.classList.add("bg-td_red");
      this.#tdEl?.classList.remove("bg-white");
    } else {
      this.#tdEl?.classList.add("bg-white");
    }
  }
}
