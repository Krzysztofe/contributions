import { FormCreator } from "../../../components/formCreator";
import { PopupCreator } from "../../../components/popupCreator";
import { dataMemberFields } from "../form/dataMemberFields";
import { MemberEditSubmit } from "./memberEditSubmit";

class FormMemberEditPrinter {
  #form = new FormCreator("popupContainer");
  #eventTarget: HTMLElement | null = null;

  constructor(eventTarget: HTMLElement) {
    this.#eventTarget = eventTarget;
    this.#createForm();
  }

  #passValuesToInputs() {
    const inputsElems = document
      .getElementById("popupMemberEdit")
      ?.querySelectorAll("input");

    // const tdInternalElems = document.querySelectorAll(
    //   `[data-month-id="${this.#memberId}_${this.#monthNumber}"]`
    // );

    // const amountText =
    //   tdInternalElems[1].textContent?.replace("zł", "").trim() || "";
    // const dateText = tdInternalElems[2].textContent?.trim() || "";
    // const commentText = tdInternalElems[3].textContent || "";

    // if (inputsElems && textareaEl) {
    //   inputsElems[0].value = +amountText > 0 ? amountText : StateAmount.amount;
    //   inputsElems[1].value = dateText;
    //   textareaEl.value = commentText;
    // }
  }

  #createForm() {
    document.getElementById("popupMemberEdit")?.remove();
    this.#form.createForm({
      formId: "popupMemberEdit",
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
      inputsData: dataMemberFields,
      inputStyles: ["pr-0", "w-full"],
    });
    this.#form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
    });
    this.#passValuesToInputs();
    new MemberEditSubmit();
  }
}

export class PopupMemberEdit extends PopupCreator {
  tableBodyEl = document.querySelector("tbody");
  #eventTarget: HTMLElement | null = null;

  constructor() {
    super();
    this.#printPopupEvent();
  }
  #handlePrintPopup(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    if (this.#eventTarget.classList.value.includes("fa-pen-to-square")) {
      this.createPopupContainetr();
      new FormMemberEditPrinter(this.#eventTarget);
    }
  }
  #printPopupEvent() {
    this.tableBodyEl?.addEventListener(
      "click",
      this.#handlePrintPopup.bind(this)
    );
  }
}
