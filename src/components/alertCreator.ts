import { URL_MEMBERS } from "../data/dataUrl";
import { HttpRequest } from "../services/httpRequest";
import { LoadingTableCreator } from "./loadingsCreators/loadingTableCreator";
import { TableMembersPrinter } from "../pages/settings/table/tableMembersPrinter";
import { StateMembers } from "./stateMembers";
export class AlertCreator {
  parentEl: HTMLElement | null;
  bodyEL: HTMLElement | null;
  clickedContainer: HTMLElement | null;
  btnDelete: HTMLButtonElement | null = null;
  rowId: string | null = null;
  dataItemId: string | null = null;
  modalEl: HTMLDialogElement | null = null;
  request: any;
  loader: any;
  dataToPrint: any[];

  constructor(elem: string, clickableEl: string, dataToPrint: any[]) {
    this.parentEl = document.getElementById(elem);
    this.bodyEL = document.querySelector("body");
    this.clickedContainer = document.getElementById(clickableEl) as HTMLElement;
    this.request = new HttpRequest();
    this.dataToPrint = dataToPrint;
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
 <div class="modal-box rounded-sm w-5/6 md:p-14 bg-white">
 <p class="font-bold text-lg text-center">Usunąć ${member}?</p>
 <div class="modal-action flex">
 <form method="dialog" class="mx-auto">
<button id="${modalId}_delete"  class="btn btn-sm rounded-sm bg-accent hover:bg-primary_dark hover:border-primary_dark text-white px-8">Tak</button>
 <button id="btnNo" class="btn btn-sm rounded-sm bg-grey_primary text-white ml-4 md:ml-8 px-8">Nie</button>
 </form>
 </div>
 </div>`;
    this.parentEl?.append(dialogEl);
    this.modalEl = dialogEl;
    const btnDelete = document.getElementById(`${modalId}_delete`);
    btnDelete?.addEventListener("click", this.deleteMember.bind(this));
    const btnNo = document.getElementById("btnNo");
    btnNo?.addEventListener("click", this.addScroll.bind(this));
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
      this.bodyEL?.classList.remove("overflow-y-scroll");
    }
  }

  addScroll() {
    this.bodyEL?.classList.add("overflow-y-scroll");
    document.querySelector("dialog")?.remove();
  }

  deleteMember() {
    document.querySelector("dialog")?.remove();
    LoadingTableCreator.createLoadingContainer("body");
    this.bodyEL?.classList.add("overflow-y-scroll");

    const DELETEMemberOptions = {
      url: URL_MEMBERS,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: { id: this.dataItemId },
    };

    this.request
      .sendRequest(DELETEMemberOptions)
      .then((data: { isLoading: boolean; fetchedData: string }) => {
        const updatedData = this.dataToPrint.filter(({ id }) => {
          return id !== data.fetchedData;
        });
        StateMembers.setMembers(updatedData);
        document.querySelector("table")?.remove();
        new TableMembersPrinter(updatedData);
        LoadingTableCreator.removeLoadingContainer();
      });
  }
}
