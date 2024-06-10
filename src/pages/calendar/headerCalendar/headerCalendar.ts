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
  #inputCurrency = document.createElement("span");
  #inputAmountValue: string | null = null;

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
  #displayCurrency() {
    const currencyStyles =
      this.#inputAmountValue || StateAmount.amount ? "block" : "hidden";

    this.#inputCurrency.innerText = "zł";
    this.#inputCurrency.classList.add(
      "absolute",
      "top-1",
      "left-8",
      currencyStyles
    );
    this.#inputAmountContainer.append(this.#inputCurrency);
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
    this.#displayCurrency();
  }

  #handleChangeInputCurrency(e: Event) {
    const eventTarget = e.target as HTMLInputElement;
    this.#inputAmountValue = (e.target as HTMLInputElement).value;

    const hasValue = !!this.#inputAmountValue;

    this.#inputCurrency.classList.toggle("hidden", !hasValue);
    this.#inputCurrency.classList.toggle("block", hasValue);

    let value = eventTarget?.value;

    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    eventTarget.value = value;
    this.#inputAmountValue = eventTarget.value;
  }

  #POSTOptions() {
    return {
      url: URL_AMOUNT_GLOBAL,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        amount: this.#inputAmountValue || "",
      },
    };
  }

  async #handleChangeInputAmount() {
    const spinner = new LoadingSpinner("#defaultAmount");
    spinner.createSpinner();
    await Helpers.fetchData(this.#POSTOptions());
    this.#inputAmountValue
      ? (StateAmount.amount = this.#inputAmountValue)
      : (StateAmount.amount = "0");
    spinner.removeSpinner();
  }

  #changeAmountEvent() {
    this.#inputAmountEl?.addEventListener(
      "input",
      this.#handleChangeInputCurrency.bind(this)
    );
    this.#inputAmountEl?.addEventListener(
      "input",
      Helpers.debounce(this.#handleChangeInputAmount.bind(this), 1500)
    );
  }
}
