import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { AutoLogoutCreator } from "./../../components/autoLogoutCreator";
import { TableCalendarPrinter } from "./tableCalendarPrinter";
import { Helpers } from "../../utils/helpers";
import { HeaderCalendar } from "./headerCalendar";
import { PopupTable } from "./popup/popupTable";

class CalendarManager {
  // #GETCalendarOptions = {
  //   url: URL_CALENDAR,
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //   },
  // };

  constructor() {
    this.#init();
  }
  async #init() {
    Helpers.isUserLoged();
    new LoadigPageCreator();
    new HeaderCalendar(["flex", "items-center", "justify-between"]);
    // const calendarDatabase = await Helpers.fetchData(this.#GETCalendarOptions);
    new TableCalendarPrinter();
    new PopupTable();
    new AutoLogoutCreator();
  }
}

new CalendarManager();
