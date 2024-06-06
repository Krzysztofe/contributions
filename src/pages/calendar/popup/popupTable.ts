import { StateAmount } from "../states/StateAmount";
import { FormCreator } from "../../../components/formCreator";
import { dataPopupFields } from "./dataPopupFields";
import { PopupSubmit } from "./popupSubmit";
import { Helpers } from "../../../utils/helpers";
import { ModelMonth } from "../../../sharedModels/modelMonth";

export class PopupTable {
  #bodyEl = document.querySelector("body");
  #popupContainer: HTMLElement | null = null;
  #eventTarget: HTMLElement | null = null;
  #memberId: string | null | undefined = null;
  #monthNumber: string | null | undefined = null;
  #monthDetails: ModelMonth | null = null;

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
      "right-0",
      "px-5",
      "py-3",
      "text-2xl",
      "cursor-pointer"
    );
    document.querySelector("form")?.prepend(xmarkEL);
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

    const hederEl = document.createElement("h3");
    memberFullname &&
      (hederEl.innerHTML = `
    <div class = "sm:flex justify-between font-semibold">
         <div>${memberFullname}</div>
         <div data-header-monthname>${monthName}</div>
    </div>`);
    hederEl.classList.add("mb-4");
    this.#popupContainer?.append(hederEl);
    document.getElementById("popupForm")?.prepend(hederEl);
  }

  #passValuesToInputs() {
    const inputsElems = document
      .getElementById("popupForm")
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

    this.#createHeader();
    this.#createIconXmark();
    this.#passValuesToInputs();

    form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
    });

    this.#monthDetails && new PopupSubmit(this.#monthDetails);
  }

  #createPopup(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    const isNestedInTd = Helpers.isNestedEl("td", this.#eventTarget);
    const dataAtribute = this.#eventTarget?.getAttribute("data");
    const isIconArrow =
      this.#eventTarget.classList.value.includes("fa-chevron-down");
    const isDataNoActive = this.#eventTarget?.getAttribute("data-not-active");

    if (
      dataAtribute !== "member" &&
      dataAtribute !== "idx" &&
      !isDataNoActive &&
      !isIconArrow &&
      isNestedInTd
    ) {
      document
        .querySelectorAll("[data=memberDetailsPrint]")
        .forEach(element => {
          element.classList.remove("collapseOpen");
        });

      document.querySelectorAll(".fa-chevron-down").forEach(icon => {
        icon.classList.remove("rotate-180");
      });

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
