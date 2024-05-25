import { StateAmount } from "../StateAmount";
import { FormCreator } from "../../../components/formCreator";
import { dataPopupFields } from "./dataPopupFields";
import { PopupSubmit } from "./popupSubmit";
import { Helpers } from "../../../utils/helpers";

export class PopupTable {
  #bodyEl = document.querySelector("body");
  #popupContainer: HTMLElement | null = null;
  #eventTarget: HTMLElement | null = null;
  #memberId: string | null | undefined = null;
  #monthNumber: string | null | undefined = null;

  constructor() {
    this.#printPopupEvent();
  }

  #createIconXmark() {
    const xmarkEL = document.createElement("i");
    xmarkEL.classList.add(
      "fa-solid",
      "fa-xmark",
      "absolute",
      "top-0",
      "right-2",
      "text-2xl",
      "cursor-pointer"
    );
    document.querySelector("form")?.prepend(xmarkEL);
  }

  #createHeader() {
    const monthDetails =
      this.#eventTarget &&
      this.#eventTarget?.getAttribute("data-mnth-details")?.split("/");

    const id = monthDetails;
    const memberFullname = monthDetails && monthDetails[1].replace("-", " ");
    const monthName = monthDetails && Helpers.numberOnMonth(monthDetails[2]);

    this.#memberId = monthDetails?.[0];
    this.#monthNumber = monthDetails?.[2];

    const hederEl = document.createElement("h3");
    memberFullname &&
      (hederEl.innerHTML = `
    <div class = "sm:flex justify-between font-semibold">
         <div data-member-id = ${id}>${memberFullname}</div>
         <div data-header-monthname>${monthName}</div>
    </div>`);
    hederEl.classList.add("mb-4");
    this.#popupContainer?.append(hederEl);
    document.getElementById("popupForm")?.prepend(hederEl);
  }

  #createForm() {
    const form = new FormCreator("popupContainer");
    form.createForm({
      formId: "popupForm",
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
    form.createFields({ inputsData: dataPopupFields, inputStyles: ["pr-0"] });

    const inputAmountEl = document.getElementById("amount") as HTMLInputElement;
    inputAmountEl.value = StateAmount.amount;

    form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
    });
    this.#createHeader();
    this.#createIconXmark();

    this.#memberId &&
      this.#monthNumber &&
      new PopupSubmit(this.#memberId, (+this.#monthNumber + 1).toString());
  }

  #createPopup(e: Event) {
    this.#eventTarget = e.target as HTMLElement;

    const isNestedInTd = Helpers.isNestedEl("td", this.#eventTarget);
    const dataAtribute = this.#eventTarget?.getAttribute("data");

    if (dataAtribute !== "member" && dataAtribute !== "idx" && isNestedInTd) {
      const popupContainer = document.createElement("div");
      popupContainer.id = "popupContainer";
      popupContainer.classList.add(
        "fixed",
        "top-0",
        "w-screen",
        "h-screen",
        "bg-black_opacity",
        "overflow-y-scroll",
        "z-50"
      );
      this.#bodyEl?.append(popupContainer);
      this.#popupContainer = popupContainer;
      this.#createForm();
      this.#removePopupEvent();
    }
  }

  #removePopupOnClick(e: Event) {
    const eventTarget = e.target as HTMLElement;

    if (
      eventTarget?.classList.value.includes("bg-black_opacity") ||
      eventTarget?.classList.value.includes("fa-xmark")
    ) {
      this.#popupContainer?.remove();
    }
  }

  #printPopupEvent() {
    const tableBodyEl = document.querySelector("tbody");
    tableBodyEl?.addEventListener("click", this.#createPopup.bind(this));
  }

  #removePopupEvent() {
    this.#popupContainer?.addEventListener(
      "click",
      this.#removePopupOnClick.bind(this)
    );
  }
}
