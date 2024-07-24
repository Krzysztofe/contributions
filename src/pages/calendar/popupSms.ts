import { URL_CALENDAR } from "./../../data/dataUrl";
import { BtnsCreator } from "../../components/btnsCreator";
import { LoadingPopupCreator } from "../../components/loadingsCreators/loadingPopupCreator";
import { PopupCreator } from "../../components/popupCreator";
import { Helpers } from "../../utils/helpers";
import { StateCalendar } from "./states/StateCalendar";
import { StateYear } from "./states/StateYear";

export class PopupSms extends PopupCreator {
  #iconEl = document.querySelector("[data-icon-sms]");
  #hederEl = document.createElement("h3");
  #popupConainerEl: HTMLElement | null = null;
  constructor() {
    super();
    this.#printPopupEvent();
  }

  #isMemberPayedContribs(member: any) {
    const monthsKeys = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const memberContribs = monthsKeys.map((key, idx) => {
      const isJoinedInPrintedYear = member[key].join_date.includes(
        StateYear.year
      );

      if (isJoinedInPrintedYear) {
        const joinMonth = member[key].join_date.split("-")[1];
        const joinMonthNumber = parseInt(joinMonth, 10);
        if (joinMonthNumber <= idx + 1) {
          return member[key].amount;
        } else {
          return null;
        }
      } else {
        return member[key].amount;
      }
    });

    const isNotPayedContrib =
      memberContribs
        .slice(0, Helpers.currentMonthInNumber)
        .filter(contrib => contrib === "0").length > 0;

    return isNotPayedContrib;
  }

  #countSmsNumber() {
    const members = StateCalendar.sortedCalendar;
    const payedMembers = members.map(member => {
      return this.#isMemberPayedContribs(member);
    });

    const notPayedContribsNumber = payedMembers.filter(
      payedMember => payedMember === true
    ).length;

    return notPayedContribsNumber;
  }

  #createSmsText() {
    let textSms;

    if (this.#countSmsNumber() === 1) {
      textSms = "sms";
    }

    if (this.#countSmsNumber() > 1 && this.#countSmsNumber() < 5) {
      textSms = "smsy";
    }
    if (this.#countSmsNumber() > 4) {
      textSms = "smsów";
    }
    return textSms;
  }

  #createHeader() {
    this.#popupConainerEl = document.getElementById("popupInnerContainer");

    this.#hederEl.classList.add("font-semibold", "text-center");
    const currentMonth = Helpers.getCurrentMonth()
      .split("-")
      .reverse()
      .join(".");

    this.#hederEl.innerHTML = `Wysłać ${this.#countSmsNumber()} ${this.#createSmsText()} z informacją o zaległościach do <br/> ${currentMonth} ?`;
    this.#popupConainerEl?.append(this.#hederEl);
  }
  GETCalendarOptions = {
    url: `${URL_CALENDAR}${Helpers.currentYear}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  async #handlePrintPopup() {
    const calendarDatabase = await Helpers.fetchData(this.GETCalendarOptions);

    console.log("", calendarDatabase?.headers);

    this.createPopupContainetr();
    document.querySelector("[data-icon-xmark]")?.remove();
    const loader = new LoadingPopupCreator("#popupInnerContainer");
    loader.createSpinner();
    this.#createHeader();
    new BtnsCreator("#popupInnerContainer");
  }

  #printPopupEvent() {
    this.#iconEl?.addEventListener("click", this.#handlePrintPopup.bind(this));
  }
}
