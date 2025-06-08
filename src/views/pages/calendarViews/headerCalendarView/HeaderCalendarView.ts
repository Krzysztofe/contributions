import { HelpersCalendar } from "../../../../helpers/helpersCalendar";
import { AmountModel } from "../../../../models/calendarModels/amountModel";
import { HeaderLogedInView } from "../../../sharedViews/headerLogedInView/headerLogedInView";
import { amountInputField } from "../headerCalendar/amountInputField";
import { ListHeaderLeftSide } from "../listHeaderLeftSideView";
import { leftSideListItems } from "./leftSideListItems";


export class HeaderCalendarView extends HeaderLogedInView {
  #leftSideContainerEl = document.createElement("div");
  #inputAmountContainer = document.createElement("div");
  #inputAmountEl: HTMLInputElement | null = null;
  #tooltipEl: HTMLElement | null = null;

  constructor(styles: string[]) {
    super(styles);
    this.#createLeftSideContainer();
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
    HelpersCalendar.createCurrencyInInput({
      parentEl: this.#inputAmountContainer,
      elementId: "amountGlobal",
      styles: "lg:block",
    });
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
}
