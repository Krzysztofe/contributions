import { URL_AMOUNT_GLOBAL } from "../../config/apiUrl";
import { HeaderLogedInView } from "../../views/sharedViews/headerLogedInView/headerLogedInView";
import { Helpers } from "../../utils/helpers";
import { AmountModel } from "../../models/calendarModels/amountModel";
import { ListHeaderLeftSide } from "../../views/pages/calendarViews/listHeaderLeftSideView";
import { amountInputField } from "../../views/pages/calendarViews/headerCalendar/amountInputField";
import { LoadingInputView } from "../../views/pages/calendarViews/loaders/loadingInputView";
import { ReprintAllTdBalancesView } from "../../views/pages/calendarViews/reprints/reprintAllTdBalancesView";
import { leftSideListItems } from "../../views/pages/calendarViews/headerCalendar/leftSideListItems";



export class HeaderCalendar extends HeaderLogedInView {
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
      iconsData: leftSideListItems,
    });
  }

  async #createInputAmount() {
    this.#inputAmountContainer.id = "inputAmountContainer";
    this.#inputAmountContainer.classList.add("relative", "hover-tooltip");

    amountInputField.forEach((input) => {
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
    this.#inputAmountEl.value = AmountModel.amount;
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
    const loader = new LoadingInputView("inputAmountContainer");
    loader.createSpinner();
    await Helpers.fetchData(this.#POSTOptions());
    this.#inputAmountEl?.value
      ? (AmountModel.amount = this.#inputAmountEl?.value)
      : (AmountModel.amount = "0");
    new ReprintAllTdBalancesView();
    loader.removeSpinner();
  }

  #changeAmountEvents() {
    this.#inputAmountEl?.addEventListener(
      "input",
      Helpers.debounce(this.#handleChangeInputAmount.bind(this), 1500)
    );

    this.#inputAmountEl?.addEventListener("input", (e) => {
      this.#currencyEl &&
        Helpers.handleReprintCurrencyInInput({
          e: e,
          currencyEl: this.#currencyEl,
          styles: "lg:block",
        });
    });
  }
}
