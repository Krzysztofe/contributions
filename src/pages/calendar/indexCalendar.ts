import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { AutoLogoutCreator } from "./../../components/autoLogoutCreator";
import { TableCalendarPrinter } from "./tableCalendarPrinter";
import { Helpers } from "../../utils/helpers";
import { HeaderCalendar } from "./headerCalendar";
import { PopupTable } from "./popup/popupTable";
import { URL_CALENDAR } from "../../data/dataUrl";
import { StateCalendar } from "./StateCalendar";



class CalendarManager {
  GETOptions = {
    url: `${URL_CALENDAR}2024`,
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
    // console.log("", calendarDatabase?.fetchedData);
    StateCalendar.setCalendar(calendarDatabase?.fetchedData);
    console.log('',StateCalendar.sortedCalendar)
    new TableCalendarPrinter();
    new PopupTable();
    new AutoLogoutCreator();
  }
}

new CalendarManager();



// fetch('https://kkrol.host83.nstrefa.pl/nowe/auth/contrib', {
//         method: "post",
//         headers: {
//             'Authorization': Bearer ${localStorage.getItem("jwt")}
//         },
//         body: JSON.stringify({
//             client_id,
//             year,
//             month,
//             amount,
//             pay_date
//         })
//     }).then(res => {
//         if(res){
//             console.log(res);
//         }
//     })