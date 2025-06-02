import { createMonthDetailsFormFields } from "./createMonthDetailsFormFields";
import { CreateMonthDetailsController } from "../../../../controllers/calendarControllers/createMonthDetailsController";
import { AmountModel } from "../../../../models/calendarModels/amountModel";
import { Helpers } from "../../../../utils/helpers";
import { FormView } from "../../../sharedViews/formView";
import { TypeMonth } from "../../../../sharedTypes/typeMonth";

export class FormMonthDetailsBuilder {
  #hederEl = document.createElement("h3");
  #monthDetails: TypeMonth | null = null;
  #formEl: HTMLFormElement | null = null;
  #inputAmountEl: HTMLInputElement | null = null;
  #currencyEl: HTMLElement | null = null;
  #memberId: string | null | undefined = null;
  #monthNumber: string | null | undefined = null;
  #form = new FormView("popupInnerContainer");
  #eventTarget: HTMLElement | null = null;

  constructor(eventTarget: HTMLElement) {
    this.#eventTarget = eventTarget;
    this.#createForm();
  }

  #createHeader() {
    const monthDetailsString =
      this.#eventTarget &&
      this.#eventTarget?.getAttribute("data-month-details");
    const monthDetails = monthDetailsString && JSON.parse(monthDetailsString);

    this.#monthDetails = monthDetails;

    const memberFullname = monthDetails.fullname.replace(/\_/g, " ");
    const monthName = Helpers.numberOnMonthPolish(monthDetails.monthNumber);
    this.#memberId = monthDetails.id;
    this.#monthNumber = monthDetails.monthNumber;

    memberFullname &&
      (this.#hederEl.innerHTML = `
      <div>
           <div class = "text-xs" data-header-monthname >${monthName}</div>
           <div class = "font-semibold">${memberFullname}</div>  
      </div>`);
    this.#hederEl.classList.add("mb-4");
    this.#formEl?.prepend(this.#hederEl);
    document.getElementById("popupMonthDetails")?.prepend(this.#hederEl);
  }

  #passValuesToInputs() {
    const inputsElems = document
      .getElementById("popupMonthDetails")
      ?.querySelectorAll("input");
    const textareaEl = document.querySelector("textarea");

    const tdInternalElems = document.querySelectorAll(
      `[data-month-id="${this.#memberId}_${this.#monthNumber}"]`
    );

    const amountText =
      tdInternalElems[1].textContent?.replace("zł", "").trim() || "";
    const dateText = tdInternalElems[2].textContent?.trim() || "";
    const commentText = tdInternalElems[3].textContent || "";

    if (inputsElems && textareaEl) {
      inputsElems[0].value = +amountText > 0 ? amountText : AmountModel.amount;
      inputsElems[1].value = dateText;
      textareaEl.value = commentText;
    }
  }

  #createForm() {
    document.querySelector("form")?.remove();
    this.#form.createForm({
      formId: "popupMonthDetails",
      styles: ["flex", "flex-col", "m-auto", "w-full"],
    });
    this.#form.createFields({
      inputsData: createMonthDetailsFormFields,
      inputStyles: ["pr-0", "w-full"],
    });
    this.#formEl = document.querySelector("form");
    const firstFieldEl = this.#formEl?.querySelector("div");
    this.#inputAmountEl = document.getElementById("amount") as HTMLInputElement;
    firstFieldEl &&
      Helpers.createCurrencyInInput({
        parentEl: firstFieldEl,
        elementId: "amountPopup",
        styles: "block",
      });
    this.#currencyEl = document.getElementById("amountPopup");
    const currencyStyles = AmountModel.amount ? "block" : "hidden";
    this.#currencyEl?.classList.add(currencyStyles);

    this.#createHeader();
    this.#passValuesToInputs();
    this.#printCurrencyEvent();

    this.#form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
      id: "btnEditMonth",
    });

    this.#monthDetails && new CreateMonthDetailsController(this.#monthDetails);
  }

  #printCurrencyEvent() {
    this.#inputAmountEl?.addEventListener("input", (e) => {
      this.#currencyEl &&
        Helpers.handleReprintCurrencyInInput({
          e: e,
          currencyEl: this.#currencyEl,
          styles: "block",
        });
    });
  }
}
