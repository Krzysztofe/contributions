import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { StateMembers } from "../../components/stateMembers";
import { URL_MEMBERS } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { isUserLoged } from "../../utils/isUserLoged";
import { FormMemberPrinter } from "./form/formMemberPrinter";
import { LoadingTableSettings } from "./loadingTableSettings";
import { TableMembersPrinter } from "./table/tableMembersPrinter";
import { AlertCreator } from "../../components/alertCreator";

class SettingsManager {
  constructor() {
    this.#init();
  }

  async #init() {
    isUserLoged();
    new LoadigPageCreator();
    new HeaderLogedIn(["flex", "items-center", "justify-between"]);
    LoadingTableSettings.createLoadingContainer();
    const membersDatabase = await this.#fetchData();
    StateMembers.setMembers(membersDatabase?.fetchedData);
    new FormMemberPrinter();
    new TableMembersPrinter();
    new AlertCreator("sectionTable", "tableMembers");
    LoadingTableSettings.removeLoadingContainer();
    new AutoLogoutCreator();
  }

  #fetchData() {
    const GETMembersOptions = {
      url: URL_MEMBERS,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const request = new HttpRequest();
    return request.sendRequest(GETMembersOptions);
  }
}

new SettingsManager();
