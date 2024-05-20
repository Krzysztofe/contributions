import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { dataAmountInput } from "../../components/headerCreator/dataInputs";
import { StateAmount } from "./StateAmount";
import { LoadingSpinner } from "../../components/loadingsCreators/loadingSpinner";
import { Helpers } from "../../utils/helpers";

export class HeaderCalendar extends HeaderLogedIn {
  constructor(styles: string[]) {
    super(styles);
    this.#createInputAmount();
  }

  async #handleChangeInput(e: Event) {
    const spinner = new LoadingSpinner("#defaultAmount");
    spinner.createSpinner();
    const inputValue = (e.target as HTMLInputElement).value;
    StateAmount.amount = inputValue;
    spinner.removeSpinner();
  }

  #createInputAmount() {
    const navEl = document.querySelector("nav");

    dataAmountInput.forEach(input => {
      navEl?.append(
        this.form.createInput(input, [
          "absolute",
          "w-20",
          "lg:w-20",
          "-top-[2px]",
          "lg:top-0",
          "right-[100%]",
          "hidden",
          "md:block",
          "pr-0",
        ])
      );
    });

    const inputEl = document.getElementById("defaultAmount");

    if (inputEl) {
      inputEl.addEventListener(
        "input",
        Helpers.debounce(this.#handleChangeInput.bind(this), 1500)
      );
    }
  }
}
