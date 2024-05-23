import { Helpers } from "../../../utils/helpers";
import { LoadingButtonCreator } from "../../../components/loadingsCreators/loadingButtonCreator";
import { StateCalendar } from "../StateCalendar";

export class PopupSubmit {
  #formEl = document.querySelector("form");
  constructor() {
    this.#submetEvent();
  }

  #POSTOptions() {
    return {
      url: "https://kkrol.host83.nstrefa.pl/nowe/auth/contrib",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        client_id: "4",
        year: "2024",
        month: "7",
        amount: "195",
        pay_date: "2024-05-13",
        comment:"eeeee"
      },
    };
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const btnLoader = new LoadingButtonCreator("btnSubmit");
    btnLoader.createSpinner();
    const calendarDatabase = await Helpers.fetchData(this.#POSTOptions());
    // console.log("", Helpers.getFormValues(e));
    StateCalendar.setCalendar(calendarDatabase?.fetchedData);
  }
  #submetEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
