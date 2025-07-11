import { URL_AMOUNT_GLOBAL } from "../../config/apiUrl";
import { AmountModel } from "../../models/calendarModels/amountModel";
import { HelpersCalendar } from "../../helpers/helpersCalendar";
import { HelpersForm } from "../../helpers/helpersForm";
import { HelpersHttp } from "../../helpers/helpersHttp";
import { LoadingInputView } from "../../views/pages/calendarViews/loaders/loadingInputView";
import { ReprintAllTdBalancesView } from "../../views/pages/calendarViews/reprints/reprintAllTdBalancesView";

export class EditContributionAmountController {
  #inputAmountEl: HTMLInputElement | null = null;
  #currencyEl: HTMLElement | null = null;

  constructor() {
    this.#inputAmountEl = document.getElementById(
      "defaultAmount"
    ) as HTMLInputElement;
    this.#changeAmountEvents();
  }

  #POSTOptions() {
    return {
      url: URL_AMOUNT_GLOBAL,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        amount: this.#inputAmountEl?.value || "",
      },
    };
  }

  async #handleChangeInputAmount() {
    const loader = new LoadingInputView("inputAmountContainer");
    loader.createSpinner();
    await HelpersHttp.fetchData(this.#POSTOptions());
    this.#inputAmountEl?.value
      ? (AmountModel.amount = this.#inputAmountEl?.value)
      : (AmountModel.amount = "0");
    new ReprintAllTdBalancesView();
    loader.removeSpinner();
  }
  #changeAmountEvents() {
    this.#currencyEl = document.getElementById("amountGlobal");
    this.#inputAmountEl?.addEventListener(
      "input",
      HelpersForm.debounce(this.#handleChangeInputAmount.bind(this), 1500)
    );

    this.#inputAmountEl?.addEventListener("input", (e) => {
      this.#currencyEl &&
        HelpersCalendar.handleReprintCurrencyInInput({
          e: e,
          currencyEl: this.#currencyEl,
          styles: "lg:block",
        });
    });
  }
}
