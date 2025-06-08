import { URL_MEMBERS } from "../../config/apiUrl.ts";
import { LoadingTableSettingsView } from "../../views/pages/settingsViews/loadingTableSettingsView.ts";
import { MembersModel } from "../../models/settingsModels/membersModel.ts";
import { ToastView } from "../../views/sharedViews/toastView.ts";
import { ReprintTableSettingsView } from "../../views/pages/settingsViews/tableSettings/reprintTableSettingsView.ts";
import { HelpersHttp } from "../../helpers/helpersHttp.ts";
import { HelpersAuth } from "../../helpers/helpersAuth.ts";

export class DeleteMemberController {
  #loading = new LoadingTableSettingsView();
  #bodyEL = document.querySelector("body");
  #memberId: string | null;
  #clikedBtnEl: HTMLButtonElement | null;

  constructor(memberId: string, clikedBtnEl: HTMLButtonElement | null) {
    this.#memberId = memberId;
    this.#clikedBtnEl = clikedBtnEl;
    this.#deleteEvent();
  }

  #updatedData(memberId: string) {
    return MembersModel.sortedMembers?.filter(({ id }: { id: string }) => {
      return id.toString() !== memberId;
    });
  }

  #DELETEOptions() {
    return {
      url: URL_MEMBERS,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: { id: this.#memberId || "" },
    };
  }

  async #handleDelete() {
    document.querySelector("dialog")?.remove();
    this.#loading.createLoading();
    this.#bodyEL?.classList.add("overflow-y-scroll");
    const deletedMemberId = await HelpersHttp.fetchData(this.#DELETEOptions());

    MembersModel.setMembers(this.#updatedData(deletedMemberId));
    new ReprintTableSettingsView();
    this.#loading.removeLoading();
    const popupContainerEL = document.getElementById("popupContainer");
    popupContainerEL?.remove();
    popupContainerEL?.querySelector("h3")?.remove();
    new ToastView("Usunięto");
  }
  #deleteEvent() {
    HelpersAuth.isUserLogged();
    this.#clikedBtnEl?.addEventListener("click", this.#handleDelete.bind(this));
  }
}
