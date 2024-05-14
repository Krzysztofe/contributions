import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { LoadingTableCreator } from "../../components/loadingsCreators/loadingTableCreator";
import { StateMembers } from "../../components/stateMembers";
import { URL_MEMBERS } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { isUserLoged } from "../../utils/isUserLoged";
import { FormMemberPrinter } from "./form/formMemberPrinter";
import { TableMembersPrinter } from "./table/tableMembersPrinter";

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

const prtintDataInTable = async () => {
  LoadingTableCreator.createLoadingContainer("body");

  const members = await fetchData();
  StateMembers.setMembers(members?.fetchedData);
  const toPrint = StateMembers.sortedMembers;
  new FormMemberPrinter(URL_MEMBERS, toPrint);
  toPrint && new TableMembersPrinter(toPrint);

  LoadingTableCreator.removeLoadingContainer();
};

prtintDataInTable();

new AutoLogoutCreator();
