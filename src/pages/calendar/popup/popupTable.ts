import { StateAmount } from "../StateAmount";
import { FormCreator } from "../../../components/formsCreators/formCreator";
import { dataPopupFields } from "./dataPopupFields";
import { PopupSubmit } from "./popupSubmit";

export class PopupTable {
  #bodyEl = document.querySelector("body");
  #popupContainer: HTMLElement | null = null;
  constructor() {
    this.#printPopupEvent();
  }

  #createIconXmark() {
    const xmarkEL = document.createElement("i");
    xmarkEL.classList.add(
      "fa-solid",
      "fa-xmark",
      "absolute",
      "top-2",
      "right-2",
      "text-2xl",
      "cursor-pointer"
    );
    document.querySelector("form")?.prepend(xmarkEL);
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
        "rounded-sm",
        "bg-white",
        "relative",
      ],
    });
    form.createFields({ inputsData: dataPopupFields });

    const inputAmountEl = document.getElementById("amount") as HTMLInputElement;
    inputAmountEl.value = StateAmount.amount;

    form.createBtn({
      innerText: "Zapisz",
      styles: ["text-center", "w-full", "py-1", "m-auto", "rounded-sm"],
    });
    this.#createIconXmark();
    new PopupSubmit();
  }

  #createPopup() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";
    popupContainer && (popupContainer.innerText = StateAmount.amount);
    popupContainer.classList.add(
      "fixed",
      "top-0",
      "w-screen",
      "h-screen",
      "bg-black_opacity",
      "grid",
      "place-content-center",
      "z-50"
    );
    this.#bodyEl?.append(popupContainer);
    this.#popupContainer = popupContainer;
    this.#createForm();
    this.#removePopupEvent();
  }

  #removePopup(e: Event) {
    if (
      (e.target as HTMLElement)?.classList.value.includes("bg-black_opacity") ||
      (e.target as HTMLElement)?.classList.value.includes("fa-xmark")
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
      this.#removePopup.bind(this)
    );
  }
}
