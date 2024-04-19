export class AlertCreator {
  parentElem: HTMLElement | null;
  btnDelete: HTMLButtonElement | null = null;
  memberId: string | null = null;
  clickableEl: HTMLElement | null;
  modalEl: HTMLDialogElement | null = null;

  constructor(elem: string, clickableEl: string) {
    this.parentElem = document.getElementById(elem);
    this.clickableEl = document.getElementById(clickableEl) as HTMLElement;
    this.init();
  }

  init() {
    this.createModal();
    this.printAlertEvent();
    this.deleteMemberEvent();
  }

  createModal() {
    const dialogEl = document.createElement("dialog");
    dialogEl.id = "my_modal_1";
    dialogEl.classList.add("modal");
    dialogEl.innerHTML = `
 <div class="modal-box rounded-sm w-5/6 md:p-14">
 <p class="font-bold text-lg text-center">Usunąć członka komisji?</p>
 <div class="modal-action flex">
 <form method="dialog" class="mx-auto">
 <button id="delete" class="btn btn-sm rounded-sm bg-accent text-white px-8">Tak</button>
 <button class="btn btn-sm rounded-sm bg-grey_primary text-white ml-4 md:ml-8 px-8">Nie</button>
 </form>
 </div>
 </div>`;
    this.parentElem?.append(dialogEl);
    this.modalEl = dialogEl;
    this.btnDelete = document.getElementById("delete") as HTMLButtonElement;
  }

  printAlert(e: MouseEvent) {
    const btnTarget = e.target as HTMLButtonElement;
    const elemID = btnTarget.id;
    const btnEl = document.getElementById(elemID);
    const btnElId = btnEl?.id;

    if (elemID === btnElId) {
      this.modalEl?.showModal();
      this.memberId = elemID;
    }
  }
  deleteMember() {
    const clikedBtn = this.memberId && document.getElementById(this.memberId);
    const rowId = clikedBtn && clikedBtn?.getAttribute("data-row-id");
    rowId && document.getElementById(rowId)?.remove();
  }

  printAlertEvent() {
    this.clickableEl?.addEventListener("click", this.printAlert.bind(this));
  }

  deleteMemberEvent() {
    this.btnDelete?.addEventListener("click", this.deleteMember.bind(this));
  }
}
