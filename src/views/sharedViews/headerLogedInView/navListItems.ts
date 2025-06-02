import { iconUser } from "../../../icons/iconUser";
import { iconGear } from "../../../icons/iconGear";
import { iconCalendar } from "../../../icons/iconCalendar";
const currentUrl = location.href;
const isCalendar = currentUrl.includes("calendar");
const isSettings = currentUrl.includes("settings");

export const navListItems = [
  {
    text: "Kalendarz",
    iconSVG: iconCalendar,
    path: "/src/views/pages/calendarViews/calendar.html",
  },
  {
    text: "Ustawienia",
    iconSVG: iconGear,
    path: "/src/views/pages/settingsViews/settings.html",
  },
  { text: "Wyloguj", iconSVG: iconUser, path: "#" },
];

isCalendar && navListItems.splice(0, 1);
isSettings && navListItems.splice(1, 1);
