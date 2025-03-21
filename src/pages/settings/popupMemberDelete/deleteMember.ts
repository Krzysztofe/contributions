import { URL_MEMBERS } from "../../../data/dataUrl";
import { LoadingTableSettings } from "../loadingTableSettings";
import { ReprintSettingsPanel } from "../reprintSettingsPanel";
import { Helpers } from "../../../utils/helpers";
import { StateMembers } from "../stateMembers";
import { ToastPrinter } from "../../../components/toastPrinter";

export class DeleteMember {
  #loading = new LoadingTableSettings();
  #bodyEL = document.querySelector("body");
  #memberId: string | null;
  #clikedBtnEl: HTMLButtonElement | null;

  constructor(memberId: string, clikedBtnEl: HTMLButtonElement | null) {
    this.#memberId = memberId;
    this.#clikedBtnEl = clikedBtnEl;
    this.#deleteEvent();
  }

  #updatedData(memberId: string) {
    return StateMembers.sortedMembers?.filter(({ id }: { id: string }) => {
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
    const deletedMemberId = await Helpers.fetchData(this.#DELETEOptions());

    StateMembers.setMembers(this.#updatedData(deletedMemberId));
    new ReprintSettingsPanel();
    this.#loading.removeLoading();
    const popupContainerEL = document.getElementById("popupContainer");
    popupContainerEL?.remove();
    popupContainerEL?.querySelector("h3")?.remove();
    new ToastPrinter("Usunięto");
  }
  #deleteEvent() {
    Helpers.isUserLoged();
    this.#clikedBtnEl?.addEventListener("click", this.#handleDelete.bind(this));
  }
}
