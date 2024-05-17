import { LoadingTableSettings } from "../../pages/settings/loadingTableSettings";
import { URL_MEMBERS } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { StateMembers } from "../stateMembers";
import { TableMembersPrinter } from "../../pages/settings/tableMembersPrinter";
import { AlertCreator } from "./alertCreator";
import { ToastPrinter } from "../toastPrinter";

export class DeleteMember {
  #loading = new LoadingTableSettings();
  #bodyEL = document.querySelector("body");
  memberId: string | null = null;
  clikedBtnEl: any = null;

  constructor(memberId: any, clikedBtnEl: any) {
    this.memberId = memberId;
    this.clikedBtnEl = clikedBtnEl;
    this.#clickEvent();
  }

  fetchData() {
    const DELETEMemberOptions = {
      url: URL_MEMBERS,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: { id: this?.memberId },
    };

    const reqest = new HttpRequest();
    return reqest.sendRequest(DELETEMemberOptions);
  }

  async #handleDelete() {
    document.querySelector("dialog")?.remove();
    this.#loading.createLoading();
    this.#bodyEL?.classList.add("overflow-y-scroll");
    const data = await this.fetchData();
    // const data = await Helpers.fetchData(this.DELETEMemberOptions);
    const updatedData = StateMembers.sortedMembers?.filter(({ id }) => {
      return id !== data?.fetchedData;
    });
    StateMembers.setMembers(updatedData);
    document.querySelector("table")?.remove();
    new TableMembersPrinter();
    new AlertCreator();
    this.#loading.removeFormErrors();
    this.#loading.removeLoading();
    new ToastPrinter("Usunięto");
  }
  #clickEvent() {
    this.clikedBtnEl.addEventListener("click", this.#handleDelete.bind(this));
  }
}
