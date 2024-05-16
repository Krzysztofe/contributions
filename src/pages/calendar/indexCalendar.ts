import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { isUserLoged } from "../../utils/isUserLoged";
import { AutoLogoutCreator } from "./../../components/autoLogoutCreator";
import { TableCalendarPrinter } from "./tableCalendarPrinter";

class CalendarManager {
  constructor() {
    isUserLoged();
    new LoadigPageCreator();
    new HeaderLogedIn(["flex", "items-center", "justify-between"]);
    new TableCalendarPrinter();
    new AutoLogoutCreator();
  }
}

new CalendarManager();
