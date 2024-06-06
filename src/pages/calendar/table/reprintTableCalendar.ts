import { Helpers } from "../../../utils/helpers";
import { ModelMonth } from "../../../sharedModels/modelMonth";

type ModelNewMonth = Omit<ModelMonth, "join_date">;

export class ReprintTableCalendar {
  #newMonth: ModelNewMonth | null = null;
  #tdEl: HTMLElement | null = null;

  constructor(newMonth: ModelNewMonth) {
    this.#newMonth = newMonth;
    this.#tdEl = document.querySelector(
      `[data-month-id="${newMonth.id}_${newMonth.monthNumber}"]`
    );
    this.#tdInnerHtml();
    this.#printCollapseArrow();
  }

  #tdInnerHtml() {
    this.#tdEl && (this.#tdEl.innerHTML = "");

    if (this.#tdEl && this.#newMonth) {
      this.#tdEl.innerHTML = Helpers.tdInnerHtmlPattern(this.#newMonth);
      this.#tdBgColor();
    }
  }

  #tdBgColor() {
    if (!this.#tdEl) return;

    if (this.#tdEl.firstElementChild?.textContent?.trim() === "0 zł") {
      this.#tdEl.classList.add("bg-td_red");
      this.#tdEl.classList.remove("bg-inherit");
    } else {
      this.#tdEl.classList.add("bg-inherit");
      this.#tdEl.classList.remove("bg-td_red");
    }
    this.#tdEl.classList.add("animateTd");

    setTimeout(() => {
      this.#tdEl?.classList.remove("animateTd");
    }, 400);
  }

  #printCollapseArrow() {
    const memberFullname = this.#newMonth?.fullname.replace(/\_/g, " ");
    const tdFullnameEl =
      memberFullname && document.getElementById(memberFullname);
    const iconEL =
      tdFullnameEl && tdFullnameEl.querySelector(".fa-chevron-down");

    const allEmptyCollapses =
      tdFullnameEl instanceof HTMLElement &&
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
