import { AlertCreator } from "../../components/alertCreator/alertCreator";
import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { StateMembers } from "../../components/stateMembers";
import { URL_MEMBERS } from "../../data/dataUrl";
import { HeaderLogedIn } from "../../components/headerCreator/headerLogedIn";
import { Helpers } from "../../utils/helpers";
import { FormMemberPrinter } from "./form/formMemberPrinter";
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
    new AlertCreator();
    new AutoLogoutCreator();
  }
}

new SettingsManager();
