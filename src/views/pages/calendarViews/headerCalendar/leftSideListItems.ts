import { iconEdit } from "../../../../icons/iconEdit";
import { iconEmail } from "../../../../icons/iconEmail";
import { iconPdf } from "../../../../icons/iconPdf";
import { iconRocket } from "../../../../icons/iconRocket";


export const leftSideListItems = [
  {
    iconSVG: iconRocket,
    dataAttribute: "data-icon-rocket",
    tooltip: "Automat",
  },
  {
    iconSVG: iconEdit,
    dataAttribute: "data-icon-edit",
    tooltip: "Edytuj",
  },
  { iconSVG: iconPdf, dataAttribute: "data-icon-pdf", tooltip: "Zapisz" },
  { iconSVG: iconEmail, dataAttribute: "data-icon-email", tooltip: "Wyślij" },
];
