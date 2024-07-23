import { iconUser } from "../../../icons/iconUser";
import { iconGear } from "../../../icons/iconGear";
import { iconCalendar } from "../../../icons/iconCalendar";
const currentUrl = location.href;
const isCalendar = currentUrl.includes("calendar");
const isSettings = currentUrl.includes("settings");


export const dataNavList = [
  {
    text: "Kalendarz",
    iconSVG: iconCalendar,
    path: "/src/pages/calendar/calendar.html",
  },
  {
    text: "Ustawienia",
    iconSVG: iconGear,
    path: "/src/pages/settings/settings.html",
  },
  { text: "Wyloguj", iconSVG: iconUser, path: "#" },
];

isCalendar && dataNavList.splice(0, 1);
isSettings && dataNavList.splice(1, 1);
