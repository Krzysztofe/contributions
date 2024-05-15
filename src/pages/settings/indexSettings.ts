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

isUserLoged();
new LoadigPageCreator();
new HeaderLogedIn(["flex", "items-center", "justify-between"]);

const fetchData = () => {
  const request = new HttpRequest();
  const GETMembersOptions = {
    url: URL_MEMBERS,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };
  return request.sendRequest(GETMembersOptions);
};

const setingsPrinter = async () => {
  LoadingTableSettings.createLoadingContainer("body");
  const membersOrygin = await fetchData();
  StateMembers.setMembers(membersOrygin?.fetchedData);
  new FormMemberPrinter();
  new TableMembersPrinter();
  new AlertCreator("sectionTable", "tableMembers");
  LoadingTableSettings.removeLoadingContainer();
};

setingsPrinter();

new AutoLogoutCreator();
