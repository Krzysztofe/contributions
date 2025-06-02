import { TypeMonth } from "../../sharedTypes/typeMonth";
import { Helpers } from "../../utils/helpers";
import { LoadingButtonView } from "../../views/sharedViews/loadersViews/loadingButtonView";
import { URL_MONTH_DETAILS } from "../../config/apiUrl";
import { printedYearModel } from "../../models/calendarModels/printedYearModel";
import { TypeObjectString } from "../../sharedTypes/typeObjectString";
import { CalendarModel } from "../../models/calendarModels/calendarModel";
import { ReprintTdInCalendarView } from "../../views/pages/calendarViews/reprints/reprintTdInCalendarView";
import { ReprintTdYearBalanceView } from "../../views/pages/calendarViews/reprints/reprintTdYearBalanceView";
import { ReprintTdTotalBalanceView } from "../../views/pages/calendarViews/reprints/reprintTdTotalBalanceView";



export class CreateMonthDetailsController {
  #formEl = document.querySelector("form");
  #formValues: TypeObjectString | null = null;
  #memberId: string | null = null;
  #monthNumber: string | null = null;
  #monthName: string | null = null;
  #monthDetails: TypeMonth | null = null;
  #dataAtributeId: string | null = null;
  #btnLoader = new LoadingButtonView("btnEditMonth");

  constructor(monthDetails: TypeMonth) {
    this.#memberId = monthDetails.id;
    this.#monthNumber = monthDetails.monthNumber;
    this.#monthName =
      (this.#monthNumber && Helpers.numberOnMonthEnglish(this.#monthNumber)) ||
      "";
    this.#monthDetails = monthDetails;
    this.#dataAtributeId = `${monthDetails.id}_${monthDetails.monthNumber}`;
    this.#submetEvent();
  }

  #newMonth() {
    if (!this.#monthDetails || !this.#formValues) return;

    return {
      ...this.#monthDetails,
      amount: this.#formValues?.amount,
      pay_date: this.#formValues?.pay_date,
      comment: this.#formValues?.comment,
    };
  }

  #POSTOptions() {
    return {
      url: URL_MONTH_DETAILS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        client_id: this.#memberId || "",
        year: printedYearModel.year || "",
        month: this.#monthNumber || "",
        amount: this.#formValues?.amount || "0",
        pay_date: this.#formValues?.pay_date || "",
        comment: this.#formValues?.comment || "",
      },
    };
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.#formValues = Helpers.getFormValues(e);

    this.#btnLoader.createSpinner();
    await Helpers.fetchData(this.#POSTOptions());
    const newMonth = this.#newMonth();
    if (newMonth) {
      new ReprintTdInCalendarView(newMonth);
    }

    new ReprintTdYearBalanceView(this.#dataAtributeId);
    new ReprintTdTotalBalanceView(
      `${this.#memberId}_${this.#monthNumber}`,
      parseInt(this.#formValues?.amount || "0")
    );

    if (!this.#memberId || !this.#monthName || !this.#monthNumber) return;

    CalendarModel.setYearsCotribs(
      this.#memberId,
      this.#monthNumber,
      this.#formValues?.amount,
      e.target as HTMLElement
    );

    CalendarModel.setPayedSum(
      this.#memberId,
      this.#formValues?.amount,
      this.#monthName
    );

    document.getElementById("popupContainer")?.remove();
  }

  #submetEvent() {
    Helpers.isUserLoged();
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
