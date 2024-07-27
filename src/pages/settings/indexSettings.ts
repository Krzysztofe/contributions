import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { HeaderLogedIn } from "../../components/headerCreator/headerLogedIn/headerLogedIn";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { URL_MEMBERS } from "../../data/dataUrl";
import { Helpers } from "../../utils/helpers";
import { FormMemberPrinter } from "./form/formMemberPrinter";
import { PopupMemberDelete } from "./popupMemberDelete/popupMemberDelete";
import { PopupMemberEdit } from "./popupMemberEdit/popupMemberEdit";
import { StateMembers } from "./stateMembers";
import { TableMembersPrinter } from "./tableMembersPrinter";

class SettingsManager {
  #GETMembersOptions = {
    url: URL_MEMBERS,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  constructor() {
    this.#init();
  }

  async #init() {
    Helpers.isUserLoged();
    new LoadigPageCreator();
    new HeaderLogedIn(["flex", "items-center", "justify-between"]);
    const members = await Helpers.fetchData(this.#GETMembersOptions);
    StateMembers.setMembers(members);
    new FormMemberPrinter();
    new TableMembersPrinter();
    new PopupMemberEdit();
    new PopupMemberDelete();
    new AutoLogoutCreator();
  }
}

new SettingsManager();
