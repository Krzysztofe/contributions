import { ModelMonth } from "../../../sharedModels/modelMonth";
import { PopupCreator } from "../../../components/popupCreator";
import { Helpers } from "../../../utils/helpers";
import { StateFillMode } from "../../../states/stateFillMode";
import { FormCreator } from "../../../components/formCreator";
import { dataPopupFields } from "./dataPopupFields";
import { MonthDetailsSubmit } from "./monthDetailsSubmit";
import { StateAmount } from "../../../states/StateAmount";
import { HandleUpdateMonthAmount } from "./handleUpdateMonthAmount";

class FormMonthDetailsPrinter {
  #hederEl = document.createElement("h3");
  #monthDetails: ModelMonth | null = null;
  #formEl: HTMLFormElement | null = null;
  #inputAmountEl: HTMLInputElement | null = null;
  #currencyEl: HTMLElement | null = null;
  #memberId: string | null | undefined = null;
  #monthNumber: string | null | undefined = null;
  #form = new FormCreator("popupInnerContainer");
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
      inputsElems[0].value = +amountText > 0 ? amountText : StateAmount.amount;
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
      inputsData: dataPopupFields,
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
    const currencyStyles = StateAmount.amount ? "block" : "hidden";
    this.#currencyEl?.classList.add(currencyStyles);

    this.#createHeader();
    this.#passValuesToInputs();
    this.#printCurrencyEvent();

    this.#form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
      id: "btnEditMonth",
    });

    this.#monthDetails && new MonthDetailsSubmit(this.#monthDetails);
  }

  #printCurrencyEvent() {
    this.#inputAmountEl?.addEventListener("input", e => {
      this.#currencyEl &&
        Helpers.handleReprintCurrencyInInput({
          e: e,
          currencyEl: this.#currencyEl,
          styles: "block",
        });
    });
  }
}

export class PopupMonthDetails extends PopupCreator {
  tableBodyEl = document.querySelector("tbody");
  #eventTarget: HTMLElement | null = null;

  constructor() {
    super();
    this.#printPopupEvent();
  }

  #closeCollapse() {
    document.querySelectorAll("[data=memberDetailsPrint]").forEach(element => {
      element.classList.remove("collapseOpen");
    });

    document.querySelectorAll("[data-parent-id]").forEach(icon => {
      icon.classList.remove("rotate-180");
    });
  }

  #handleUpdateMonth(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    const isNestedInTd = Helpers.isNestedEl("td", this.#eventTarget);
    const dataAttribute = this.#eventTarget?.getAttribute("data");
    const isIconArrow = this.#eventTarget.hasAttribute("data-icon-chevron");
    const isDataNotActive = this.#eventTarget?.getAttribute("data-not-active");

    const shouldProcess =
      dataAttribute !== "member" &&
      dataAttribute !== "idx" &&
      dataAttribute !== "sum" &&
      !isIconArrow &&
      !isDataNotActive &&
      isNestedInTd;

    if (!StateFillMode.isFast && shouldProcess) {
      this.#closeCollapse();
      this.createPopupContainetr();
      new FormMonthDetailsPrinter(this.#eventTarget);
    } else if (StateFillMode.isFast && shouldProcess) {
      this.#closeCollapse();
      new HandleUpdateMonthAmount(this.#eventTarget);
    }
  }

  #printPopupEvent() {
    Helpers.isUserLoged();
    this.tableBodyEl?.addEventListener(
      "click",
      this.#handleUpdateMonth.bind(this)
    );
  }
}
