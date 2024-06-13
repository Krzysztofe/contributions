import { ModelMonth } from "./../../../sharedModels/modelMonth";
import { Helpers } from "../../../utils/helpers";
import { LoadingButtonCreator } from "../../../components/loadingsCreators/loadingButtonCreator";
import { URL_MONTH_DETAILS } from "../../../data/dataUrl";
import { StateYear } from "../states/StateYear";
import { ReprintTdInCalendar } from "../table/reprintTdInCalendar";
import { ModelObjectString } from "../../../sharedModels/modelObjectString";
import { ReprintTdSum } from "../reprintTdSum";

export class MonthDetailsSubmit {
  #formEl = document.querySelector("form");
  #formValues: ModelObjectString | null = null;
  #memberId: string | null = null;
  #monthNumber: string | null = null;
  #monthDetails: ModelMonth | null = null;
  #dataAtributeId: string | null = null;
  #btnLoader = new LoadingButtonCreator("btnSubmit");

  constructor(monthDetails: ModelMonth) {
    this.#memberId = monthDetails.id;
    this.#monthNumber = monthDetails.monthNumber;
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
        year: StateYear.year || "",
        month: this.#monthNumber || "",
        amount: this.#formValues?.amount || "",
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

    new ReprintTdSum(this.#dataAtributeId, this.#formValues?.amount);
    document.getElementById("popupContainer")?.remove();
  }

  #submetEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
