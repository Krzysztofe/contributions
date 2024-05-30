import { AlertCreator } from "../../components/alertCreator/alertCreator";
import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { StateMembers } from "../../components/stateMembers";
import { URL_MEMBERS } from "../../data/dataUrl";

import { FormMemberPrinter } from "./form/formMemberPrinter";
import { TableMembersPrinter } from "./tableMembersPrinter";
import { Helpers } from "../../utils/helpers";

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
    const membersDatabase = await Helpers.fetchData(this.#GETMembersOptions);
    StateMembers.setMembers(membersDatabase);
    new FormMemberPrinter();
    new TableMembersPrinter();
    new AlertCreator();
    new AutoLogoutCreator();
  }
}

new SettingsManager();
