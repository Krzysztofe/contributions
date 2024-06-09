import { ModelMonth } from "./../../../sharedModels/modelMonth";
import { PopupCreator } from "../../../components/popupCreator";
import { Helpers } from "../../../utils/helpers";
import { StateFillMode } from "../states/stateFillMode";
import { FormCreator } from "../../../components/formCreator";
import { dataPopupFields } from "./dataPopupFields";
import { MonthDetailsSubmit } from "./monthDetailsSubmit";
import { StateAmount } from "../states/StateAmount";

class FormMonthDetailsPrinter {
  #xmarkEL = document.createElement("i");
  #hederEl = document.createElement("h3");
  #monthDetails: ModelMonth | null = null;
  #formEl: HTMLFormElement | null = null;
  #memberId: string | null | undefined = null;
  #monthNumber: string | null | undefined = null;
  #form = new FormCreator("popupContainer");
  #eventTarget: HTMLElement | null = null;

  constructor(eventTarget: HTMLElement) {
    this.#eventTarget = eventTarget;
    this.#createForm();
  }

  #createIconXmark() {
    this.#xmarkEL.classList.add(
      "fa-solid",
      "fa-xmark",
      "absolute",
      "top-0",
      "right-0",
      "px-5",
      "py-3",
      "text-2xl",
      "cursor-pointer"
    );
    document.querySelector("form")?.prepend(this.#xmarkEL);
  }

  #createHeader() {
    const monthDetailsString =
      this.#eventTarget &&
      this.#eventTarget?.getAttribute("data-month-details");
    const monthDetails = monthDetailsString && JSON.parse(monthDetailsString);

    this.#monthDetails = monthDetails;

    const memberFullname = monthDetails.fullname.replace(/\_/g, " ");
    const monthName = Helpers.numberOnMonth(monthDetails.monthNumber);
    this.#memberId = monthDetails.id;
    this.#monthNumber = monthDetails.monthNumber;

    this.#hederEl = document.createElement("h3");
    memberFullname &&
      (this.#hederEl.innerHTML = `
      <div class = "sm:flex justify-between font-semibold">
           <div>${memberFullname}</div>
           <div data-header-monthname>${monthName}</div>
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
      styles: [
        "flex",
        "flex-col",
        "sm:bg-white",
        "sm:border",
        "px-16",
        "py-8",
        "max-w-96",
        "m-auto",
        "rounded-sm",
        "bg-white",
        "relative",
        "mt-14",
      ],
    });
    this.#form.createFields({
      inputsData: dataPopupFields,
      inputStyles: ["pr-0", "w-full"],
    });
    this.#formEl = document.querySelector("form");
    this.#createIconXmark();
    this.#createHeader();
    this.#createIconXmark();
    this.#passValuesToInputs();

    this.#form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
    });

    this.#monthDetails && new MonthDetailsSubmit(this.#monthDetails);
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

    document.querySelectorAll(".fa-chevron-down").forEach(icon => {
      icon.classList.remove("rotate-180");
    });
  }

  #printPopup(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    const isNestedInTd = Helpers.isNestedEl("td", this.#eventTarget);
    const dataAtribute = this.#eventTarget?.getAttribute("data");
    const isIconArrow =
      this.#eventTarget.classList.value.includes("fa-chevron-down");
    const isDataNoActive = this.#eventTarget?.getAttribute("data-not-active");

    if (
      !StateFillMode.isFast &&
      dataAtribute !== "member" &&
      dataAtribute !== "idx" &&
      !isDataNoActive &&
      !isIconArrow &&
      isNestedInTd
    ) {
      this.#closeCollapse();
      this.createPopupContainetr();
      new FormMonthDetailsPrinter(this.#eventTarget);
    }
  }

  #printPopupEvent() {
    this.tableBodyEl?.addEventListener("click", this.#printPopup.bind(this));
  }
}
