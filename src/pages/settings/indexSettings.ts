import { AlertCreator } from "../../components/alertCreator";
import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { StateMembers } from "../../components/stateMembers";
import { URL_MEMBERS } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { isUserLoged } from "../../utils/isUserLoged";
import { FormMemberPrinter } from "./form/formMemberPrinter";
import { TableMembersPrinter } from "./tableMembersPrinter";

class SettingsManager {
  constructor() {
    this.#init();
  }

  async #init() {
    isUserLoged();
    new LoadigPageCreator();
    new HeaderLogedIn(["flex", "items-center", "justify-between"]);
    const membersDatabase = await this.#fetchData();
    StateMembers.processMembers(membersDatabase?.fetchedData);
    new FormMemberPrinter();
    new TableMembersPrinter();
    new AlertCreator("sectionTable", "tableMembers");
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
