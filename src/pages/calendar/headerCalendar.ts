import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { dataAmountInput } from "../../components/headerCreator/dataInputs";
import { StateAmount } from "./StateAmount";

export class HeaderCalendar extends HeaderLogedIn {
  constructor(styles: string[]) {
    super(styles);
    this.createInputAmount();
  }

  #handleChangeInput(e: Event) {
    const inputValue = (e.target as HTMLInputElement).value;
    StateAmount.amount = inputValue

  }

  createInputAmount() {
    const navEl = document.querySelector("nav");

    dataAmountInput.forEach(input => {
      navEl?.append(
        this.form.createInput(input, [
          "absolute",
          "w-24",
          "-top-[2px]",
          "lg:top-0",
          "right-[100%]",
          "hidden",
          "md:block",
        ])
      );
    });

    const inputEl = document.getElementById("amount");
    inputEl?.addEventListener("input", this.#handleChangeInput.bind(this));
  }
}
