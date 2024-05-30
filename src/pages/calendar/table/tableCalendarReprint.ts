import { Helpers } from "../../../utils/helpers";

export class TableCalendarReprint {
  #formValues: any = null;
  #monthDetails: any = null;
  #tdEl: HTMLElement | null = null;

  constructor(monthDetails: any, formValues: any) {
    this.#formValues = formValues;
    this.#monthDetails = monthDetails;
    this.#tdEl = document.querySelector(
      `[data-month-id="${monthDetails.id}_${monthDetails.monthName}"]`
    );
    this.#tdInnerHtml();
    this.#printCollapseArrow();
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
    if (!this.#tdEl) {
      return;
    }

    if (this.#tdEl.firstElementChild?.textContent?.trim() === "0 zł") {
      this.#tdEl?.classList.add("bg-td_red");
      this.#tdEl?.classList.remove("bg-inherit");
    } else {
      this.#tdEl?.classList.add("bg-inherit");
      this.#tdEl?.classList.remove("bg-td_red");
    }
    this.#tdEl.classList.add("animateTd");

    setTimeout(() => {
      this.#tdEl?.classList.remove("animateTd");
    }, 400);
  }

  #printCollapseArrow() {

    const memberId = this.#monthDetails?.id;
    const memberFullname = this.#monthDetails?.fullname.replace(/\_/g, " ");

    const tdFullnameEl = memberId && document.getElementById(memberFullname);


    const iconEL = tdFullnameEl && tdFullnameEl.querySelector(".fa-caret-down");

    const allEmptyCollapses =
      tdFullnameEl &&
      tdFullnameEl.parentElement?.querySelectorAll("[data=emptyCollapse]")
        .length === 12;

    if (allEmptyCollapses) {
      iconEL && iconEL.classList.add("invisible");
      iconEL && iconEL.classList.remove("visible");
    } else {
      iconEL && iconEL.classList.add("visible");
      iconEL && iconEL.classList.remove("invisible");
    }
  }
}
