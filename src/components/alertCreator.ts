export class AlertCreator {
  parentElem: HTMLElement | null;
  btnEl: HTMLButtonElement | null = null;
  uLEl: HTMLUListElement | null;
  modalEl: HTMLDialogElement | null = null;

  constructor(elem: string) {
    this.parentElem = document.getElementById(elem);
    this.uLEl = document.getElementById("list") as HTMLUListElement;
    this.createModal();
    this.addBtnEvent();
  }

  createModal() {
    const dialogEl = document.createElement("dialog");
    dialogEl.id = "my_modal_1";
    dialogEl.classList.add("modal");
    dialogEl.innerHTML = `
 <div class="modal-box">
 <p class="font-bold text-lg text-center">Usunąć element?</p>
 <div class="modal-action flex">
 <form method="dialog" class="mx-auto">
 <button class="btn btn-sm">Zachowaj</button>
 <button id="yo" class="btn btn-sm">Usuń</button>
 </form>
 </div>
 </div>`;
    this.parentElem?.append(dialogEl);
    this.modalEl = dialogEl;
    this.btnEl = document.getElementById("yo") as HTMLButtonElement;
  }

  deleteMember(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    if (button.tagName !== "BUTTON") return;

    this.modalEl?.showModal();
  }

  addBtnEvent() {
    this.uLEl?.addEventListener("click", this.deleteMember.bind(this));
  }
}
