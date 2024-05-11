import { HttpRequest } from "../services/httpRequest";
import { URL_MEMBERS } from "../data/dataUrl";
import { LoadingTableCreator } from "./loadingsCreators/loadingTableCreator";
import { TableCreator } from "./table/tableCreator";
// import { TableMembersManager } from "./table/tableMembersManager";

import { UpdateTableMembers } from "./table/tableMembersManager";

export class AlertCreator {
  parentEl: HTMLElement | null;
  clickedContainer: HTMLElement | null;
  btnDelete: HTMLButtonElement | null = null;
  rowId: string | null = null;
  dataItemId: string | null = null;
  modalEl: HTMLDialogElement | null = null;
  request: any;
  loader: any;

  constructor(elem: string, clickableEl: string) {
    this.parentEl = document.getElementById(elem);
    this.clickedContainer = document.getElementById(clickableEl) as HTMLElement;
    this.request = new HttpRequest();
    this.loader = new LoadingTableCreator("main");
    this.init();
  }

  init() {
    this.clickedContainer?.addEventListener(
      "click",
      this.printAlert.bind(this)
    );
  }

  createModal(member: string) {
    const modalId = `${Math.random()}`;
    const dialogEl = document.createElement("dialog");
    dialogEl.id = modalId;
    dialogEl.classList.add("modal");
    dialogEl.innerHTML = `
 <div class="modal-box rounded-sm w-5/6 md:p-14">
 <p class="font-bold text-lg text-center">Usunąć ${member}?</p>
 <div class="modal-action flex">
 <form method="dialog" class="mx-auto">
<button id="${modalId}_delete"  class="btn btn-sm rounded-sm bg-accent hover:bg-primary_dark hover:border-primary_dark text-white px-8">Tak</button>
 <button class="btn btn-sm rounded-sm bg-grey_primary text-white ml-4 md:ml-8 px-8">Nie</button>
 </form>
 </div>
 </div>`;
    this.parentEl?.append(dialogEl);
    this.modalEl = dialogEl;
    const btnDelete = document.getElementById(
      `${modalId}_delete`
    ) as HTMLButtonElement;
    btnDelete?.addEventListener("click", this.deleteMember.bind(this));
  }

  printAlert(e: MouseEvent) {
    const btnTarget = e.target as HTMLButtonElement;
    this.rowId = btnTarget.getAttribute("data-row-id");
    this.dataItemId = btnTarget.id;

    if (this.rowId) {
      const memberName = document.getElementById(this.rowId)?.children[1]
        .textContent;
      memberName && this.createModal(memberName);
      this.modalEl?.showModal();
    }
  }
  deleteMember() {
    this.loader.createLoadigContainer();

    const DELETEMemberOptions = {
      url: URL_MEMBERS,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: { id: this.dataItemId },
    };

    this.request.sendRequest(DELETEMemberOptions).then(() => {
      this.getMembers();
    });
  }

  getMembers() {
    const update = new UpdateTableMembers();
    update.performFunctionality();
    this.loader.removeLoadingContainer();
  }
}
