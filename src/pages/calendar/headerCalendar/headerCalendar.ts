import { URL_AMOUNT_GLOBAL } from "../../../data/dataUrl";
import { HeaderLogedIn } from "../../../components/headerCreator/headerLogedIn/headerLogedIn";
import { LoadingSpinner } from "../../../components/loadingsCreators/loadingSpinner";
import { Helpers } from "../../../utils/helpers";
import { StateAmount } from "../states/StateAmount";
import { ListHeaderLeftSide } from "../listHeaderLeftSide/listHeaderLeftSide";
import { dataListLeftSide } from "../listHeaderLeftSide/dataListLeftSide";
import { dataInputAmount } from "./dataInputAmount";

export class HeaderCalendar extends HeaderLogedIn {
  #leftSideContainerEl = document.createElement("div");
  #inputAmountContainer = document.createElement("div");
  #inputAmountEl: HTMLInputElement | null = null;
  #currencyEl: HTMLElement | null = null;

  constructor(styles: string[]) {
    super(styles);
    this.#createLeftSideContainer();
    this.#changeAmountEvent();
  }

  #createLeftSideContainer() {
    this.#leftSideContainerEl.id = "leftSideContainerEl";
    this.#leftSideContainerEl.classList.add("flex", "items-center");
    this.headerWrapperEl?.prepend(this.#leftSideContainerEl);
    this.#createInputAmount();
    new ListHeaderLeftSide({
      parentEl: "#leftSideContainerEl",
      elementsData: dataListLeftSide,
    });
  }

  async #createInputAmount() {
    this.#inputAmountContainer.classList.add("relative");
    dataInputAmount.forEach(input => {
      this.#inputAmountContainer?.prepend(
        this.form.createInput(input, [
          "w-[75px]",
          "hidden",
          "md:block",
          "mr-8",
          "pr-0",
        ])
      );
    });

    this.#leftSideContainerEl.append(this.#inputAmountContainer);

    this.#inputAmountEl = document.getElementById(
      "defaultAmount"
    ) as HTMLInputElement;
    await StateAmount.getAmount();
    this.#inputAmountEl.value = StateAmount.amount;
    Helpers.createCurrencyInInput({
      parentEl: this.#inputAmountContainer,
      elementId: "amountGlobal",
    });
    this.#currencyEl = document.getElementById("amountGlobal");
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
    const spinner = new LoadingSpinner("#defaultAmount");
    spinner.createSpinner();
    await Helpers.fetchData(this.#POSTOptions());
    this.#inputAmountEl?.value
      ? (StateAmount.amount = this.#inputAmountEl?.value)
      : (StateAmount.amount = "0");
    spinner.removeSpinner();
  }

  #changeAmountEvent() {
    this.#inputAmountEl?.addEventListener("input", e => {
      this.#currencyEl && Helpers.handlePrintInputCurrency(e, this.#currencyEl);
    });

    this.#inputAmountEl?.addEventListener(
      "input",
      Helpers.debounce(this.#handleChangeInputAmount.bind(this), 1500)
    );
  }
}
