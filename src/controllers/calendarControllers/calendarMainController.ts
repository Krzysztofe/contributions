import { AutoLogout } from "../../helpers/autoLogout";
import { TableCalendarBuilder } from "../../views/pages/calendarViews/table/tableCalendarBuilder";
import { URL_CALENDAR } from "../../config/apiUrl";
import { CalendarModel } from "../../models/calendarModels/calendarModel";
import { PopupMonthDetailsController } from "./popups/popupMonthDetailsController";
import { AmountModel } from "../../models/calendarModels/amountModel";
import { PopupEmailsController } from "./popups/popupEmailsController";
import { LoadigPageView } from "../../views/sharedViews/loadersViews/loadingPageView";
import { HeaderCalendarView } from "../../views/pages/calendarViews/headerCalendar/HeaderCalendarView";
import { EditContributionAmountController } from "./editContrubutionAmountController";
import { ListHeaderLeftSideController } from "./listHeaderLeftSideController";
import { HelpersHttp } from "../../helpers/helpersHttp";
import { HelpersDate } from "../../helpers/helpersDate";
import { HelpersAuth } from "../../helpers/helpersAuth";

class CalendarMainController {
  GETCalendarOptions = {
    url: `${URL_CALENDAR}${HelpersDate.currentYear}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  constructor() {
    this.#init();
  }

  async #init() {
    HelpersAuth.isUserLogged();
    await AmountModel.getAmount();
    const calendarDatabase = await HelpersHttp.fetchData(
      this.GETCalendarOptions
    );
    new LoadigPageView();
    CalendarModel.setCalendar(calendarDatabase);
    new HeaderCalendarView(["flex", "items-center"]);
    new EditContributionAmountController();
    new ListHeaderLeftSideController();
    new TableCalendarBuilder();
    new PopupMonthDetailsController();
    new PopupEmailsController();
    new AutoLogout();
  }
}

new CalendarMainController();
