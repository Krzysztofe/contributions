import { ModelMonth } from "../../../sharedModels/modelMonth";
import { Helpers } from "../../../utils/helpers";
import { LoadingButtonCreator } from "../../../components/loadingsCreators/loadingButtonCreator";
import { URL_MONTH_DETAILS } from "../../../data/dataUrl";
import { StatePrintedYear } from "../../../states/StatePrintedYear";
import { ReprintTdInCalendar } from "../table/reprintTdInCalendar";
import { ModelObjectString } from "../../../sharedModels/modelObjectString";
import { ReprintTdYearBalance } from "../reprintTdYearBalance";
import { StateCalendar } from "../../../states/StateCalendar";
import { ReprintTdTotalBalance } from "../reprintTdTotalBalance";

export class MonthDetailsSubmit {
  #formEl = document.querySelector("form");
  #formValues: ModelObjectString | null = null;
  #memberId: string | null = null;
  #monthNumber: string | null = null;
  #monthName: string | null = null;
  #monthDetails: ModelMonth | null = null;
  #dataAtributeId: string | null = null;
  #btnLoader = new LoadingButtonCreator("btnEditMonth");

  constructor(monthDetails: ModelMonth) {
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
        year: StatePrintedYear.year || "",
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
      new ReprintTdInCalendar(newMonth);
    }

    new ReprintTdYearBalance(this.#dataAtributeId);
    new ReprintTdTotalBalance(
      `${this.#memberId}_${this.#monthNumber}`,
      parseInt(this.#formValues?.amount || "0")
    );

    if (!this.#memberId || !this.#monthName || !this.#monthNumber) return;

    StateCalendar.setYearsCotribs(
      this.#memberId,
      this.#monthNumber,
      this.#formValues?.amount,
      e.target as HTMLElement
    );

    StateCalendar.setPayedSum(
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
