import { URL_AMOUNT_GLOBAL } from "../../../data/dataUrl";
import { HeaderLogedIn } from "../../../components/headerCreator/headerLogedIn/headerLogedIn";
import { LoadingSpinner } from "../../../components/loadingsCreators/loadingSpinner";
import { Helpers } from "../../../utils/helpers";
import { StateAmount } from "../states/StateAmount";
import { ListHeaderLeftSide } from "../listHeaderLeftSide/listHeaderLeftSide";
import { dataListLeftSide } from "../listHeaderLeftSide/dataListLeftSide";
import { dataInputAmount } from "./dataInputAmount";

export class HeaderCalendar extends HeaderLogedIn {
  #leftSideContainerEl: HTMLElement | null = null;
  #inputAmountEl: HTMLElement | null = null;
  #inputAmountValue: string | null = null;

  constructor(styles: string[]) {
    super(styles);
    this.#createLeftSideContainer();
  }

  #createLeftSideContainer() {
    this.#leftSideContainerEl = document.createElement("div");
    this.#leftSideContainerEl.id = "leftSideContainerEl";
    this.#leftSideContainerEl.classList.add("flex", "items-center");
    this.headerWrapperEl?.prepend(this.#leftSideContainerEl);
    this.#createInputAmount();
    new ListHeaderLeftSide({
      parentEl: "#leftSideContainerEl",
      elementsData: dataListLeftSide,
    });
  }

  #createInputAmount() {
    dataInputAmount.forEach(input => {
      this.#leftSideContainerEl?.prepend(
        this.form.createInput(input, [
          "w-[75px]",
          "hidden",
          "md:block",
          "mr-8",
          "pr-0",
        ])
      );
    });
    this.#inputAmountEl = document.getElementById("defaultAmount");

    this.#inputAmountEl?.addEventListener(
      "input",
      Helpers.debounce(this.#onChangeInputAmount.bind(this), 1500)
    );
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

  async #onChangeInputAmount(e: Event) {
    this.#inputAmountValue = (e.target as HTMLInputElement).value;
    const spinner = new LoadingSpinner("#defaultAmount");
    spinner.createSpinner();
    await Helpers.fetchData(this.#POSTOptions());
    StateAmount.amount = this.#inputAmountValue;
    spinner.removeSpinner();
  }
}
