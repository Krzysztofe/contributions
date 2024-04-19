import { LoadigPageCreator } from "../../components/loadingPageCreator";
import { FormCreator } from "../../components/formCreator";
import { dataMemberFields } from "./dataMemberFields";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { AlertCreator } from "../../components/alertCreator";
import { TableCreator } from "../../components/tableCreator";

new LoadigPageCreator();
new HeaderLogedIn(["flex", "items-center", "justify-between"]);

const memberForm = new FormCreator("mainSettings");

memberForm.createForm("userForm", [
  "mt-20",
  "mb-2.5",
  "flex",
  "flex-col",
  "items-center",
  "md:flex-row",
  "md:justify-center",
]);

memberForm.createFields(
  dataMemberFields,
  ["max-w-48", "md:max-w-40", "md:mr-2"],
  ["max-w-48", "md:max-w-40"]
);
memberForm.createBtn("Zapisz", ["w-48", "md:w-auto", "mb-auto", "border-none"]);

memberForm.submitEvent();

const settingsTable = new TableCreator("sectionTable");
settingsTable.createTable(["max-w-[1000px]"]);
settingsTable.createTableHead(["", "Imię i Nazwisko", "Telefon", ""]);
settingsTable.createTableBody(
  [
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
    { name: "Adam kowalski", phone: "777-999-888" },
  ],
  ["fa-trash"]
);
new AlertCreator("sectionTable", "tableMembers");
