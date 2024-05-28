import { TableCalendarInnerHtml } from "./tableCalendaHTML";

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
    // console.log("", this.#tdEl);

    if (this.#tdEl) {
      this.#tdEl.innerHTML = TableCalendarInnerHtml.tdInnerHtml(
        this.#monthDetails,
        this.#formValues
      );
      this.#tdBgColor()
      // TableCalendarInnerHtml.tdBgColor(this.#tdEl);
    }
  }
  #tdBgColor() {

    console.log("", this.#tdEl?.textContent?.trim());

    if (this.#tdEl?.textContent?.trim() === "0 zł") {
      this.#tdEl?.classList.add("bg-td_red");
    } else {
      this.#tdEl?.classList.add("bg-white");
    }
  }
}
