import { CalendarModel } from "../models/calendarModels/calendarModel";
import { TypeObjectString } from "../sharedTypes/typeObjectString";
import { TypeMemberCalendar } from "../sharedTypes/typeMemberCalendar";
import { TypeObjectAny } from "../sharedTypes/typeObjectAny";
import { AmountModel } from "../models/calendarModels/amountModel";
import { HelpersDate } from "./helpersDate";
import { PrintedYearModel } from "../models/calendarModels/printedYearModel";

export class HelpersCalendar {
  static translateMonth(month: string) {
    const monthTranslations: TypeObjectString = {
      january: "Sty.",
      february: "Lut.",
      march: "Mar.",
      april: "Kwi.",
      may: "Maj",
      june: "Cze.",
      july: "Lip.",
      august: "Sie.",
      september: "Wrz.",
      october: "Paź.",
      november: "Lis.",
      december: "Gru.",
    };

    return monthTranslations[month.toLowerCase()] || "";
  }

  static copyObject(object: TypeObjectAny) {
    return JSON.parse(JSON.stringify(object));
  }

  static getTableSums() {
    return this.copyObject(CalendarModel.sortedCalendar).map(
      (member: TypeMemberCalendar) => {
        return member.sum;
      }
    );
  }

  static createDataMonthDetails(month: TypeObjectAny) {
    const { id, fullname, monthNumber } = month;
    const transformedFulllName = fullname?.replace(/ /g, "_");
    const details = {
      id,
      fullname: transformedFulllName,
      monthNumber,
    };

    return JSON.stringify(details);
  }

  static tdInnerHtmlPattern(month: TypeObjectString) {
    const { id, pay_date, amount, comment, monthNumber } = month;
    const monthDetailsJSON = this.createDataMonthDetails(month);

    const dataMonthDetails = `data-month-details = ${monthDetailsJSON}`;
    const dataMonthId = `data-month-id = ${id}_${monthNumber}`;

    return `<div data = "amount" ${dataMonthId} ${dataMonthDetails} >${
      amount || "0"
    } zł</div> 

    <div data = "memberDetailsPrint" class = "collapseClose">
      <div class = "overflow-hidden" data = ${
        (pay_date === "" || pay_date === "0000-00-00") && comment === ""
          ? "emptyCollapse"
          : "fullCollapse"
      } >    
        <div ${dataMonthId} ${dataMonthDetails} class = "text-[0.6rem] font-semibold ${
      comment && "h-3"
    }">
            ${pay_date === "0000-00-00" ? "" : pay_date}
        </div> 
        <div ${dataMonthId} ${dataMonthDetails} class = "text-[0.6rem]">${
      comment || ""
    }
        </div> 
      
        </div>
    </div>`;
  }
  static createCurrencyInInput({
    parentEl,
    elementId,
    styles,
  }: {
    parentEl: HTMLElement;
    elementId: string;
    styles: string;
    inputValue?: string;
  }) {
    const currencyEl = document.createElement("span");
    currencyEl.id = elementId;
    const currencyStyles = AmountModel.amount ? styles : "hidden";
    currencyEl.innerText = "zł";
    currencyEl.classList.add(
      "absolute",
      "top-1",
      "left-8",
      `${styles === "block" ? null : "hidden"}`,
      currencyStyles
    );
    parentEl.append(currencyEl);
  }

  static handleReprintCurrencyInInput({
    e,
    currencyEl,
    styles,
  }: {
    e: Event;
    currencyEl: HTMLElement;
    styles: string;
  }) {
    const eventTarget = e.target as HTMLInputElement;
    let inputAmountValue = eventTarget.value;

    const hasValue = !!inputAmountValue;

    currencyEl.classList.toggle(styles, hasValue);
    styles === "block" && currencyEl.classList.toggle("hidden", !hasValue);

    let value = eventTarget?.value;

    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    eventTarget.value = value;
    inputAmountValue = eventTarget.value;
  }

  static getCurrentYearContribsToPay() {
    let currentYearContribsToPay = 0;

    if (AmountModel.amount) {
      if (PrintedYearModel.year > HelpersDate.currentYear) {
        currentYearContribsToPay = 0;
      } else if (PrintedYearModel.year < HelpersDate.currentYear) {
        currentYearContribsToPay = 12 * parseInt(AmountModel.amount);
      } else {
        currentYearContribsToPay =
          HelpersDate.currentMonthInNumber * parseInt(AmountModel.amount);
      }
    }

    return currentYearContribsToPay;
  }
  static isNestedEl(parentEl: string, elem: HTMLElement | null) {
    let currentElement = elem;

    while (currentElement) {
      if (currentElement.tagName.toLowerCase() === parentEl) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }

    return false;
  }
}
