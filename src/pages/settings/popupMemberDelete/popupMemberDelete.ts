import { DeleteMember } from "./deleteMember";
import { BtnsCreator } from "../../../components/btnsCreator";
import { PopupCreator } from "../../../components/popupCreator";

export class PopupMemberDelete extends PopupCreator {
  #headerEl: HTMLElement | null = null;
  #sectionTableEl = document.getElementById("sectionTable");
  #eventTarget: HTMLElement | null = null;
  #rowId: string | null = null;
  #btnDeleteEl: HTMLButtonElement | null = null;
  #memberId: string | null = null;

  constructor() {
    super();
    this.#printPopupEvent();
  }

  #createHeader(name: string) {
    document.getElementById("popupHeader")?.remove();
    this.#headerEl = document.createElement("h3");
    this.#headerEl.id = "popupHeader";
    this.#headerEl.innerHTML = `Usuniąć <br/> ${name} ?`;
    this.#headerEl.classList.add("mb-3", "font-semibold", "text-center");
    document.querySelector("#popupInnerContainer")?.prepend(this.#headerEl);
  }

  #handlePrintPopup(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    this.#rowId = this.#eventTarget.getAttribute("data-row-id");
    const isIconTrash = this.#eventTarget.hasAttribute("data-icon-trash");
    const memberName =
      this.#rowId &&
      document.getElementById(this.#rowId)?.children[1].textContent;
    this.#memberId = this.#eventTarget.getAttribute("data-member-id");

    if (isIconTrash) {
      this.createPopupContainetr();
      memberName && this.#createHeader(memberName);
      new BtnsCreator("#popupInnerContainer");
      this.#btnDeleteEl = document.getElementById("Tak") as HTMLButtonElement;
      this.#memberId && new DeleteMember(this.#memberId, this.#btnDeleteEl);
    }
  }

  #printPopupEvent() {
    this.#sectionTableEl?.addEventListener(
      "click",
      this.#handlePrintPopup.bind(this)
    );
  }
}
