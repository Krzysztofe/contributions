import { URL_AMOUNT_GLOBAL } from "../../../data/dataUrl";
import { HeaderLogedIn } from "../../../components/headerCreator/headerLogedIn/headerLogedIn";
import { Helpers } from "../../../utils/helpers";
import { StateAmount } from "../../../states/StateAmount";
import { ListHeaderLeftSide } from "../listHeaderLeftSide/listHeaderLeftSide";
import { dataListLeftSide } from "../listHeaderLeftSide/dataListLeftSide";
import { dataInputAmount } from "./dataInputAmount";
import { ReprintAllTdBalances } from "./reprintAllTdBalances";
import { LoadingInputCreator } from "../../../components/loadingsCreators/loadingInputCreator";

export class HeaderCalendar extends HeaderLogedIn {
  #leftSideContainerEl = document.createElement("div");
  #inputAmountContainer = document.createElement("div");
  #inputAmountEl: HTMLInputElement | null = null;
  #currencyEl: HTMLElement | null = null;
  #tooltipEl: HTMLElement | null = null;

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
      iconsData: dataListLeftSide,
    });
  }

  async #createInputAmount() {
    this.#inputAmountContainer.id = "inputAmountContainer";
    this.#inputAmountContainer.classList.add("relative", "hover-tooltip");

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

    this.#tooltipEl = document.createElement("div");
    this.#tooltipEl.classList.add(
      "tooltip",
      "text-xs",
      "text-white",
      "p-1",
      "px-2",
      "rounded",
      "bg-grey_primary",
      "absolute",
      "top-11",
      "left-0"
    );
    this.#tooltipEl.textContent = "Składka";

    this.#inputAmountContainer.append(this.#tooltipEl);

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
    new ReprintAllTdBalances();
    loader.removeSpinner();
  }

  #changeAmountEvents() {
    this.#inputAmountEl?.addEventListener(
      "input",
      Helpers.debounce(this.#handleChangeInputAmount.bind(this), 1500)
    );

    this.#inputAmountEl?.addEventListener("input", e => {
      this.#currencyEl &&
        Helpers.handleReprintCurrencyInInput({
          e: e,
          currencyEl: this.#currencyEl,
          styles: "lg:block",
        });
    });
  }
}
