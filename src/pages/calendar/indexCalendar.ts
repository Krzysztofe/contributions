import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { AutoLogoutCreator } from "./../../components/autoLogoutCreator";
import { TableCalendarPrinter } from "./table/tableCalendarPrinter";
import { Helpers } from "../../utils/helpers";
import { HeaderCalendar } from "./headerCalendar";
import { PopupTable } from "./popup/popupTable";
import { URL_CALENDAR } from "../../data/dataUrl";
import { StateCalendar } from "./states/StateCalendar";


class CalendarManager {
  GETOptions = {
    url: `${URL_CALENDAR}${Helpers.currentYear()}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  constructor() {
    this.#init();
  }

  async #init() {
    Helpers.isUserLoged();
    new LoadigPageCreator();
    new HeaderCalendar(["flex", "items-center", "justify-between"]);
    const calendarDatabase = await Helpers.fetchData(this.GETOptions);
    // console.log("ee", calendarDatabase);
    StateCalendar.setCalendar(calendarDatabase);
    // console.log('',StateCalendar.sortedCalendar)
    new TableCalendarPrinter();
    new PopupTable();
    new AutoLogoutCreator();
  }
}

new CalendarManager();


