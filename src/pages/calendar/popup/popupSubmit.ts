import { ModelMonth } from "./../../../sharedModels/modelMonth";
import { Helpers } from "../../../utils/helpers";
import { LoadingButtonCreator } from "../../../components/loadingsCreators/loadingButtonCreator";
import { URL_MONTH_DETAILS } from "../../../data/dataUrl";
import { StateYear } from "../states/StateYear";
import { ReprintTableCalendar } from "../table/reprintTableCalendar";
import { ModelObjectString } from "../../../sharedModels/modelObjectString";

export class PopupSubmit {
  #formEl = document.querySelector("form");
  #formValues: ModelObjectString | null = null;
  #memberId: string | null = null;
  #monthNumber: string | null = null;
  #monthDetails: ModelMonth | null = null;

  constructor(monthDetails: ModelMonth) {
    this.#memberId = monthDetails.id;
    this.#monthNumber = monthDetails.monthNumber;
    this.#monthDetails = monthDetails;
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
    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();
    await Helpers.fetchData(this.#POSTOptions());
    const newMonth = this.#newMonth();
    if (newMonth) {
      new ReprintTableCalendar(newMonth);
    }
    document.getElementById("popupContainer")?.remove();
  }

  #submetEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
