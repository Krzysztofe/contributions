import { FormCreator } from "../../utils/formCreator";
import { dataMemberFields } from "./dataMemberFields";
import { HeaderLogedIn } from "../login/headerCreator";

new HeaderLogedIn(["flex", "items-center", "justify-between"]);

const memberForm = new FormCreator("mainSettings");

memberForm.createForm([
  "my-5",
  "flex",
  "flex-col",
  "items-center",
  "md:flex-row",
  "md:justify-center",
]);

memberForm.createFields(
  dataMemberFields,
  ["max-w-48", "md:max-w-40", "mr-2"],
  ["max-w-48", "md:max-w-40"]
);
memberForm.createBtn("Zapisz", [
  "text-center",
  "py-1",
  "px-5",
  "bg-gray-500",
  "mb-auto",
  "border",
  "border-gray-500",
]);
