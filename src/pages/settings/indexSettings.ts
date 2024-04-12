import { LoadigPageCreator } from "../../components/loadingPageCreator";
import { FormCreator } from "../../components/formCreator";
import { dataMemberFields } from "./dataMemberFields";
import { HeaderLogedIn } from "../login/headerCreator/headerCreator";

new LoadigPageCreator();
new HeaderLogedIn([
  "flex",
  "items-center",
  "justify-between",
]);

const memberForm = new FormCreator("mainSettings");

memberForm.createForm("userForm", [
  "mt-16",
  "mb-5",
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
memberForm.createBtn("Zapisz", [
  "w-48",
  "md:w-auto",
  // "py-1",
  // "px-5",
  // "bg-accent",
  // "text-white",
  "mb-auto",
  "border-none",
  // "border-accent",
  // "btn",
  // "btn-primary",
  // "btn-sm",
]);

memberForm.submitEvent();
