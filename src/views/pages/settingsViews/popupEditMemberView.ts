import { FormEditMemberBuilder } from "./formEditMember/formEditMemberBuilder";
import { PopupView } from "../../sharedViews/popupView";
import { HelpersAuth } from "../../../helpers/helpersAuth";

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
    HelpersAuth.isUserLogged();
    this.#sectionTableEl?.addEventListener(
      "click",
      this.#handlePrintPopup.bind(this)
    );
  }
}
