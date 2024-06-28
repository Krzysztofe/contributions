import { AutoLogoutCreator } from "./../../components/autoLogoutCreator";
import { TableCalendarPrinter } from "./table/tableCalendarPrinter";
import { Helpers } from "../../utils/helpers";
import { HeaderCalendar } from "./headerCalendar/headerCalendar";
import { URL_CALENDAR } from "../../data/dataUrl";
import { StateCalendar } from "./states/StateCalendar";
import { PopupMonthDetails } from "./popupMonthDetails/popupMonthDetails";
import { StateAmount } from "./states/StateAmount";
import { PopupSms } from "./popupSms";
import { LoadigCalendarPageCreator } from "../../components/loadingsCreators/loadingCalendarPageCreator";

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
    await StateAmount.getAmount();
    new HeaderCalendar(["flex", "items-center"]);
    const calendarDatabase = await Helpers.fetchData(this.GETCalendarOptions);
    new LoadigCalendarPageCreator(calendarDatabase);
    StateCalendar.setCalendar(calendarDatabase);
    new TableCalendarPrinter();
    new PopupMonthDetails();
    new PopupSms();
    new AutoLogoutCreator();
  }
}

new CalendarManager();
