// import { URL_CALENDAR } from "./../../data/dataUrl";
import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { isUserLoged } from "../../utils/isUserLoged";
import { AutoLogoutCreator } from "./../../components/autoLogoutCreator";
import { TableCalendarPrinter } from "./tableCalendarPrinter";
// import { Helpers } from "../../utils/helpers";

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
    isUserLoged();
    new LoadigPageCreator();
    new HeaderLogedIn(["flex", "items-center", "justify-between"]);
    // const calendarDatabase = await Helpers.fetchData(this.#GETCalendarOptions);
    new TableCalendarPrinter();
    new AutoLogoutCreator();
  }
}

new CalendarManager();
