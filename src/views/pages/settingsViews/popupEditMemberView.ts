import { Helpers } from "../../../utils/helpers";
import { FormEditMemberBuilder } from "./formEditMember/formEditMemberBuilder";
import { PopupView } from "../../sharedViews/popupView";

export class PopupEditMemberView extends PopupView {
  #sectionTableEl = document.getElementById("sectionTable");
  #eventTarget: HTMLElement | null = null;

  constructor() {
    super();
    this.#printPopupEvent();
  }

  #handlePrintPopup(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    const isIconEdit = this.#eventTarget.hasAttribute("data-icon-edit");

    if (isIconEdit) {
      this.createPopupContainetr();
      new FormEditMemberBuilder(this.#eventTarget);
    }
  }

  #printPopupEvent() {
    Helpers.isUserLoged();
    this.#sectionTableEl?.addEventListener(
      "click",
      this.#handlePrintPopup.bind(this)
    );
  }
}
