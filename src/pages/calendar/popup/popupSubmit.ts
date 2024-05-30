import { Helpers } from "../../../utils/helpers";
import { LoadingButtonCreator } from "../../../components/loadingsCreators/loadingButtonCreator";
import { URL_MONTH_DETAILS } from "../../../data/dataUrl";
import { TableCalendarReprint } from "../table/tableCalendarReprint";
import { StateYear } from "../states/StateYear";

export class PopupSubmit {
  #formEl = document.querySelector("form");
  #formValues: { [key: string]: string } | null = null;
  #memberId: string | null = null;
  #monthNumber: string | null = null;
  #monthDetails: string | null = null;

  constructor(monthDetails: any) {
    this.#memberId = monthDetails.id;
    this.#monthNumber = monthDetails.monthName;
    this.#monthDetails = monthDetails;
    this.#submetEvent();
  }

  #POSTOptions() {
    return {
      url: URL_MONTH_DETAILS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        client_id: this.#memberId,
        year: StateYear.year,
        month: this.#monthNumber,
        amount: this.#formValues?.amount,
        pay_date: this.#formValues?.pay_date,
        comment: this.#formValues?.comment,
      },
    };
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.#formValues = Helpers.getFormValues(e);
    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();

    await Helpers.fetchData(this.#POSTOptions());

    new TableCalendarReprint(this.#monthDetails, this.#formValues);

    document.getElementById("popupContainer")?.remove();
  }

  #submetEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
