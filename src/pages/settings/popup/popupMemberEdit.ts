import { FormCreator } from "../../../components/formCreator";
import { PopupCreator } from "../../../components/popupCreator";
import { dataMemberEditFields } from "./dataMemberEditFields";
import { MemberEditSubmit } from "./memberEditSubmit";

class FormMemberEditPrinter {
  #form = new FormCreator("popupInnerContainer");
  #inputsElems: NodeListOf<HTMLInputElement> | undefined | null = null;
  #eventTarget: HTMLElement | null = null;

  constructor(eventTarget: HTMLElement) {
    this.#eventTarget = eventTarget;
    this.#createForm();
  }

  #passValuesToInputs() {
    this.#inputsElems = document
      .getElementById("popupMemberEdit")
      ?.querySelectorAll("input");
    const trParentEl = this.#eventTarget?.closest("tr")?.querySelectorAll("td");

    if (!trParentEl) return;
    const tdTexts = Array.from(trParentEl).map(item => {
      return item.textContent || "";
    });

    const memberFirstname = tdTexts[1].split(" ")[1];
    const memberLastname = tdTexts[1].split(" ")[0];

    if (this.#inputsElems) {
      this.#inputsElems[0].value = memberFirstname;
      this.#inputsElems[1].value = memberLastname;
      this.#inputsElems[2].value = tdTexts[2];
      this.#inputsElems[3].value = tdTexts[3];
    }
  }

  #createForm() {
    document.getElementById("popupMemberEdit")?.remove();
    this.#form.createForm({
      formId: "popupMemberEdit",
      styles: ["flex", "flex-col", "m-auto"],
    });
    this.#form.createFields({
      inputsData: dataMemberEditFields,
      inputStyles: ["pr-0", "w-full"],
    });
    this.#form.createBtn({
      innerText: "Zapisz",
      styles: ["w-full", "py-1", "m-auto"],
      id: "btnEditMember",
    });

    this.#passValuesToInputs();
    new MemberEditSubmit(this.#eventTarget?.getAttribute("data-member-id"));
  }
}

export class PopupMemberEdit extends PopupCreator {
  #sectionTableEl = document.getElementById("sectionTable");
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
    this.#sectionTableEl?.addEventListener(
      "click",
      this.#handlePrintPopup.bind(this)
    );
  }
}
