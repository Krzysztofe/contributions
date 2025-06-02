import { AutoLogout } from "../../utils/autoLogout";
import { TableCalendarBuilder } from "../../views/pages/calendarViews/table/tableCalendarBuilder";
import { Helpers } from "../../utils/helpers";
import { URL_CALENDAR } from "../../config/apiUrl";
import { CalendarModel } from "../../models/calendarModels/calendarModel";
import { PopupMonthDetailsController } from "./popups/popupMonthDetailsController";
import { AmountModel } from "../../models/calendarModels/amountModel";
import { PopupEmailsController } from "./popups/popupEmailsController";
import { LoadigPageView } from "../../views/sharedViews/loadersViews/loadingPageView";
import { HeaderCalendarView } from "../../views/pages/calendarViews/headerCalendar/HeaderCalendarView";
import { EditContributionAmountController } from "./editContrubutionAmountController";
import { ListHeaderLeftSideController } from "./listHeaderLeftSideController";

class CalendarMainController {
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
    await AmountModel.getAmount();
    const calendarDatabase = await Helpers.fetchData(this.GETCalendarOptions);
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
