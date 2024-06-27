import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { AutoLogoutCreator } from "./../../components/autoLogoutCreator";
import { TableCalendarPrinter } from "./table/tableCalendarPrinter";
import { Helpers } from "../../utils/helpers";
import { HeaderCalendar } from "./headerCalendar/headerCalendar";
import { URL_CALENDAR } from "../../data/dataUrl";
import { StateCalendar } from "./states/StateCalendar";
import { PopupMonthDetails } from "./popup/popupMonthDetails";
import { StateAmount } from "./states/StateAmount";
import { PopupSmsCreator } from "./popupSms/popupSmsCreator";

class CalendarManager {
  GETCalendarOptions = {
    url: `${URL_CALENDAR}${Helpers.currentYear}`,
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
    await StateAmount.getAmount();
    new HeaderCalendar(["flex", "items-center"]);
    const calendarDatabase = await Helpers.fetchData(this.GETCalendarOptions);
    StateCalendar.setCalendar(calendarDatabase);
    new TableCalendarPrinter();
    new LoadigPageCreator();
    new PopupMonthDetails();
    new PopupSmsCreator();
    new AutoLogoutCreator();
  }
}

new CalendarManager();
