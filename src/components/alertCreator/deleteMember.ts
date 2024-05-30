import { URL_MEMBERS } from "../../data/dataUrl";
import { LoadingTableSettings } from "../../pages/settings/loadingTableSettings";
import { RecreateSettingPanel } from "../../pages/settings/recreateSettingsPanel";
import { HttpRequest } from "../../services/httpRequest";
import { StateMembers } from "../stateMembers";

export class DeleteMember {
  #loading = new LoadingTableSettings();
  #bodyEL = document.querySelector("body");
  memberId: string | null;
  clikedBtnEl: HTMLButtonElement | null;

  constructor(memberId: string, clikedBtnEl: HTMLButtonElement | null) {
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
    const updatedData = StateMembers.sortedMembers?.filter(
      ({ id }: { id: string }) => {
        return id !== data
      }
    );
    new RecreateSettingPanel(updatedData, "Usunięto");
  }
  #clickEvent() {
    this.clikedBtnEl?.addEventListener("click", this.#handleDelete.bind(this));
  }
}
