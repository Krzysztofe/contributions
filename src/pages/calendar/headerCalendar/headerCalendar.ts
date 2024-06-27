import { URL_AMOUNT_GLOBAL } from "../../../data/dataUrl";
import { HeaderLogedIn } from "../../../components/headerCreator/headerLogedIn/headerLogedIn";
import { Helpers } from "../../../utils/helpers";
import { StateAmount } from "../states/StateAmount";
import { ListHeaderLeftSide } from "../listHeaderLeftSide/listHeaderLeftSide";
import { dataListLeftSide } from "../listHeaderLeftSide/dataListLeftSide";
import { dataInputAmount } from "./dataInputAmount";
import { ReprintAllTdSums } from "./reprintAllTdSums";
import { LoadingInputCreator } from "../../../components/loadingsCreators/loadingInputCreator";

export class HeaderCalendar extends HeaderLogedIn {
  #leftSideContainerEl = document.createElement("div");
  #inputAmountContainer = document.createElement("div");
  #inputAmountEl: HTMLInputElement | null = null;
  #currencyEl: HTMLElement | null = null;

  constructor(styles: string[]) {
    super(styles);
    this.#createLeftSideContainer();
    this.#changeAmountEvents();
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
    this.#inputAmountContainer.id = "inputAmountContainer";
    this.#inputAmountContainer.classList.add("relative");
    dataInputAmount.forEach(input => {
      this.#inputAmountContainer?.prepend(
        this.form.createInput(input, [
          "w-[75px]",
          "hidden",
          "lg:block",
          "mr-8",
          "pr-0",
        ])
      );
    });

    this.#leftSideContainerEl.append(this.#inputAmountContainer);

    this.#inputAmountEl = document.getElementById(
      "defaultAmount"
    ) as HTMLInputElement;
    this.#inputAmountEl.value = StateAmount.amount;
    Helpers.createCurrencyInInput({
      parentEl: this.#inputAmountContainer,
      elementId: "amountGlobal",
      styles: "lg:block",
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
    const loader = new LoadingInputCreator("inputAmountContainer");
    loader.createSpinner();
    await Helpers.fetchData(this.#POSTOptions());
    this.#inputAmountEl?.value
      ? (StateAmount.amount = this.#inputAmountEl?.value)
      : (StateAmount.amount = "0");
    new ReprintAllTdSums();
    loader.removeSpinner();
  }

  #changeAmountEvents() {
    this.#inputAmountEl?.addEventListener("input", e => {
      this.#currencyEl &&
        Helpers.handlePrintInputCurrency({
          e: e,
          currencyEl: this.#currencyEl,
          styles: "md:block",
        });
    });

    this.#inputAmountEl?.addEventListener(
      "input",
      Helpers.debounce(this.#handleChangeInputAmount.bind(this), 1500)
    );
  }
}
