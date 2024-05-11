import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { FormCreateMember } from "../../components/formsCreators/formMemberCreator";
import { dataMemberFields } from "./dataMemberFields";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { AlertCreator } from "../../components/alertCreator";
import { TableCreator } from "../../components/tableCreator";
import { URL_MEMBERS } from "../../data/dataUrl";
import { isUserLoged } from "../../utils/isUserLoged";
import { AutoLogoutCreator } from "../../components/autoLogoutCreator";
import { HttpRequest } from "../../services/httpRequest";
import { LoadingTableCreator } from "../../components/loadingsCreators/loadingTableCreator";

isUserLoged();
new LoadigPageCreator();
new HeaderLogedIn(["flex", "items-center", "justify-between"]);

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

const settingsTable = new TableCreator("sectionTable");
const GETMembersOptions = {
  url: URL_MEMBERS,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};
const request = new HttpRequest();

request.sendRequest(GETMembersOptions).then(requestMembers => {
  const dataInTable = requestMembers?.fetchedData.map(
    ({ fullname, phone, id }: any) => {
      // console.log('',id)

      return { id, fullname, phone };
    }
  );

  console.log("", dataInTable);

  if (!dataInTable || dataInTable.length === 0) {
    settingsTable.noDataContainer();
  } else {
    settingsTable.createTable(["max-w-[1000px]"]);
    settingsTable.createTableHead([
      `${dataInTable.length}`,
      "Imię i Nazwisko",
      "Telefon",
      "",
    ]);

    settingsTable.createTableBody(dataInTable, ["fa-trash"]);
    new AlertCreator("sectionTable", "tableMembers");
    // const tableEl = document.querySelector("table");
    // tableEl?.classList.add("mr-2");
  }
});

//  console.log('',tableEl)

new AutoLogoutCreator();

// function addDashes(str: string) {
//   const chunks = [];
//   for (let i = 0; i < str.length; i += 3) {
//     chunks.push(str.substring(i, i + 3));
//   }
//   if (chunks.length > 1 && chunks[chunks.length - 1].length < 3) {
//     chunks[chunks.length - 2] += chunks.pop();
//   }
//   return chunks.join("-");
// }

// const result = addDashes("99999999");

// console.log("", result);
