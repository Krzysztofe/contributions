import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { FormCreateMember } from "../../components/formsCreators/formMemberCreator";
import { dataMemberFields } from "./dataMemberFields";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { URL_MEMBERS } from "../../data/dataUrl";
import { isUserLoged } from "../../utils/isUserLoged";
import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { PrintTableMembers } from "../../components/table/tableMembersManager";

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
  ["max-w-48", "md:max-w-40"]
);
memberForm.createBtn("Zapisz", ["w-48", "md:w-auto", "mb-auto", "border-none"]);

memberForm.submitEvent(URL_MEMBERS);

// Table


const tableMembers = new PrintTableMembers();
tableMembers.performFunctionality();



new AutoLogoutCreator();
