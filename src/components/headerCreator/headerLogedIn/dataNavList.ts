const currentUrl = location.href;
const isCalendar = currentUrl.includes("calendar");
const isSettings = currentUrl.includes("settings");

export const dataNavList = [
  {
    text: "Kalendarz",
    iconClass: "fa-calendar-days",
    path: "/src/pages/calendar/calendar.html",
  },
  {
    text: "Ustawienia",
    iconClass: "fa-gear",
    path: "/src/pages/settings/settings.html",
  },
  { text: "Wyloguj", iconClass: "fa-user", path: "#" },
];

isCalendar && dataNavList.splice(0, 1);
isSettings && dataNavList.splice(1, 1);
