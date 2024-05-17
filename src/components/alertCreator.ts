import { DeleteMember } from "./alertCreator/deleteMember";

export class AlertCreator {
  parentEl: HTMLElement | null;
  bodyEL: HTMLElement | null;
  clickedContainer: HTMLElement | null;
  btnDelete: HTMLButtonElement | null = null;
  rowId: string | null = null;
  dataItemId: string | null = null;
  modalEl: HTMLDialogElement | null = null;

  constructor(elem: string, clickableEl: string) {
    this.parentEl = document.getElementById(elem);
    this.bodyEL = document.querySelector("body");
    this.clickedContainer = document.getElementById(clickableEl) as HTMLElement;
    this.init();
    console.log("eee");
  }

  init() {
    console.log("", this.clickedContainer);
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

    new DeleteMember(this.dataItemId, btnDelete);
  }

  printAlert(e: MouseEvent) {
    console.log("eee");
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

  // fetchData() {
  //   const DELETEMemberOptions = {
  //     url: URL_MEMBERS,
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //     },
  //     body: { id: this?.dataItemId },
  //   };

  //   const reqest = new HttpRequest();
  //   return reqest.sendRequest(DELETEMemberOptions);
  // }

  // async deleteMember() {
  //   document.querySelector("dialog")?.remove();
  //   this.#loading.createLoading();
  //   this.bodyEL?.classList.add("overflow-y-scroll");
  //   const data = await this.fetchData();
  //   // const data = await Helpers.fetchData(this.DELETEMemberOptions);
  //   const updatedData = StateMembers.sortedMembers?.filter(({ id }) => {
  //     return id !== data?.fetchedData;
  //   });
  //   StateMembers.setMembers(updatedData);
  //   document.querySelector("table")?.remove();
  //   new TableMembersPrinter();
  //   new AlertCreator("sectionTable", "tableMembers");
  //   this.#loading.removeFormErrors();
  //   this.#loading.removeLoading();
  //   new ToastPrinter("Usunięto");
  // }
}
