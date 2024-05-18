import { DeleteMember } from "./deleteMember";

export class AlertCreator {
  bodyEL = document.querySelector("body");
  tableEl = document.getElementById("tableMembers");
  parentEl = document.getElementById("sectionTable");
  btnDelete: HTMLButtonElement | null = null;
  rowId: string | null = null;
  memberId: string | null = null;
  modalEl: HTMLDialogElement | null = null;

  constructor() {
    this.printAlertEvent();
  }

  createModal(member: string) {
    const modalId = `${Math.random()}`;
    const dialogEl = document.createElement("dialog");
    dialogEl.id = modalId;
    dialogEl.classList.add("modal");
    dialogEl.innerHTML = `
    <div class="modal-box rounded-sm w-5/6 md:p-14 bg-white">
      <p class="font-bold text-lg text-center">Usunąć ${member}?</p>
      <div class="modal-action flex">
        <form method="dialog" class="mx-auto">
          <button
            id="${modalId}_delete"
            class="btn btn-sm rounded-sm bg-accent hover:bg-primary_dark hover:border-primary_dark text-white px-8"
          >
            Tak
          </button>
          <button
            id="btnNo"
            class="btn btn-sm rounded-sm bg-grey_primary text-white ml-4 md:ml-8 px-8"
          >
            Nie
          </button>
        </form>
      </div>
    </div>`;

    this.parentEl?.append(dialogEl);
    this.modalEl = dialogEl;
    const btnNo = document.getElementById("btnNo");
    btnNo?.addEventListener("click", this.addScroll.bind(this));
    const btnDelete = document.getElementById(`${modalId}_delete`) as HTMLButtonElement
    this.memberId && new DeleteMember(this.memberId, btnDelete);
  }

  addScroll() {
    this.bodyEL?.classList.add("overflow-y-scroll");
    document.querySelector("dialog")?.remove();
  }

  handleAlert(e: MouseEvent) {
    const btnTarget = e.target as HTMLButtonElement;
    this.rowId = btnTarget.getAttribute("data-row-id");
    this.memberId = btnTarget.id;

    if (this.rowId) {
      const memberName = document.getElementById(this.rowId)?.children[1]
        .textContent;
      memberName && this.createModal(memberName);
      this.modalEl?.showModal();
      this.bodyEL?.classList.remove("overflow-y-scroll");
    }
  }

  printAlertEvent() {
    this.tableEl?.addEventListener("click", this.handleAlert.bind(this));
  }
}
