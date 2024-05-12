import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { FormCreateMember } from "../../components/formsCreators/formMemberCreator";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { TableMembersManager } from "../../components/table/tableMembersManager";
import { URL_MEMBERS } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { isUserLoged } from "../../utils/isUserLoged";
import { dataMemberFields } from "./dataMemberFields";

isUserLoged();
new LoadigPageCreator();
new HeaderLogedIn(["flex", "items-center", "justify-between"]);

// Member Form

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
memberForm.createBtn("Zapisz", ["w-48", "md:w-auto", "mb-auto", "border-none"]);

memberForm.submitEvent(URL_MEMBERS);

// Table

const GETMembersOptions = {
  url: URL_MEMBERS,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};
const request = new HttpRequest();

request.sendRequest(GETMembersOptions).then(requestMembers => {
  new TableMembersManager(requestMembers?.fetchedData);
});

new AutoLogoutCreator();
