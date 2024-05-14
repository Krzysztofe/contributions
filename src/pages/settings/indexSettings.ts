import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { FormCreateMember } from "../../components/formsCreators/formMemberCreator";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { TableMembersManager } from "./tableMembersManager";
import { URL_MEMBERS } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { isUserLoged } from "../../utils/isUserLoged";
import { dataMemberFields } from "./dataMemberFields";
import { LoadingTableCreator } from "../../components/loadingsCreators/loadingTableCreator";
import { sortedMembers } from "../../utils/sortedMembers";

isUserLoged();
new LoadigPageCreator();
new HeaderLogedIn(["flex", "items-center", "justify-between"]);

// Member Form
const printForm = (endpoint: string, members: any) => {
  const memberForm = new FormCreateMember("sectionMemberForm");

  memberForm.createForm("memberForm", [
    "mt-4",
    "mb-8",
    "md:mb-4",
    "flex",
    "flex-col",
    "items-center",
    "md:flex-row",
    "md:justify-center",
    "relative",
  ]);

  memberForm.createFields(
    dataMemberFields,
    ["max-w-48", "md:max-w-40", "md:mr-2"],
    ["max-w-48", "md:max-w-40", "text-uppercase", "capitalize"]
  );
  memberForm.createBtn("Zapisz", [
    "w-48",
    "md:w-auto",
    "mb-auto",
    "border-none",
  ]);

  memberForm.submitEvent(endpoint, members);
};

// Table

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
  const membersToPrint = sortedMembers(members?.fetchedData);
  printForm(URL_MEMBERS, membersToPrint);
  new TableMembersManager(membersToPrint);
  LoadingTableCreator.removeLoadingContainer();
};

prtintDataInTable();

new AutoLogoutCreator();
