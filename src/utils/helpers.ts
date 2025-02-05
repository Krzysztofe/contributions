import { ModelObjectAny } from "./../sharedModels/modelObjectAny";
import { ModelMemberCalendar } from "./../sharedModels/modelMemberCalendar";
import { StateAmount } from "../states/StateAmount";
import { HttpRequest } from "../services/httpRequest";
import { ModelObjectString } from "../sharedModels/modelObjectString";
import { ModelRequestOptions } from "../sharedModels/modelRequestOptions";
import { StateCalendar } from "../states/StateCalendar";
import { StatePrintedYear } from "../states/StatePrintedYear";

export class Helpers {
  static currentYear = new Date().getFullYear().toString();
  static currentMonthInNumber = new Date().getMonth() + 1;

  static getCurrentMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  }

  static getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static getCurrentHour() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  static getCurrentYearContribsToPay() {
    let currentYearContribsToPay = 0;

    if (StateAmount.amount) {
      if (StatePrintedYear.year > this.currentYear) {
        currentYearContribsToPay = 0;
      } else if (StatePrintedYear.year < this.currentYear) {
        currentYearContribsToPay = 12 * parseInt(StateAmount.amount);
      } else {
        currentYearContribsToPay =
          this.currentMonthInNumber * parseInt(StateAmount.amount);
      }
    }

    return currentYearContribsToPay;
  }

  static copy(object: ModelObjectAny) {
    return JSON.parse(JSON.stringify(object));
  }

  static fetchData(requestOptions: ModelRequestOptions) {
    const request = new HttpRequest();
    return request.sendRequest(requestOptions);
  }

  static capitalize(words: string) {
    return words
      .split(" ")
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  static isUserLoged() {
    const userLoged = localStorage.getItem("jwt");
    !userLoged && (location.href = "/");
  }

  static getFormValues(e: Event) {
    const elementId = (e.currentTarget as HTMLFormElement)?.id;
    const formEl = document.getElementById(elementId) as HTMLFormElement;
    const formData = formEl && new FormData(formEl);

    const formValues: ModelObjectString = {};

    if (formData) {
      for (const [key, value] of formData.entries()) {
        formValues[key] = (value as string).trim();
      }
    }

    return formValues;
  }
  static debounce(func: (...args: Event[]) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;

    const timeoutFunction = (...args: Event[]) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
    return timeoutFunction;
  }

  static sortList(array: any[]) {
    const sortedList = array?.sort((a, b) => {
      if ("fullname" in a && "fullname" in b) {
        let nameA = a.fullname.toLowerCase();
        let nameB = b.fullname.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    });

    return sortedList;
  }

  static translateMonth(month: string) {
    const monthTranslations: ModelObjectString = {
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

  static numberOnMonthPolish(month: string) {
    const monthTranslations: ModelObjectString = {
      "1": "Styczeń",
      "2": "Luty.",
      "3": "Marzec.",
      "4": "Kwiecień",
      "5": "Maj",
      "6": "Czerwiec.",
      "7": "Lipiec",
      "8": "Sierpień",
      "9": "Wrzesień",
      "10": "Październik",
      "11": "Listopad",
      "12": "Grudzień",
    };

    return monthTranslations[month.toLowerCase()] || "";
  }
  static numberOnMonthEnglish(month: string) {
    const monthTranslations: ModelObjectString = {
      "1": "january",
      "2": "february",
      "3": "march",
      "4": "april",
      "5": "may",
      "6": "june",
      "7": "july",
      "8": "august",
      "9": "september",
      "10": "october",
      "11": "november",
      "12": "december",
    };

    return monthTranslations[month.toLowerCase()] || "";
  }

  static replacePolishLetters(text: string) {
    const polishToWesternMap: { [key: string]: string } = {
      ą: "a",
      ć: "c",
      ę: "e",
      ł: "l",
      ń: "n",
      ó: "o",
      ś: "s",
      ż: "z",
      ź: "z",
      Ą: "A",
      Ć: "C",
      Ę: "E",
      Ł: "L",
      Ń: "N",
      Ó: "O",
      Ś: "S",
      Ż: "Z",
      Ź: "Z",
    };
    const replacePolishLetters = (text: string) => {
      return text
        .split("")
        .map(char => polishToWesternMap[char] || char)
        .join("");
    };

    return replacePolishLetters(text);
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

  static createDataMonthDetails(month: ModelObjectAny) {
    const { id, fullname, monthNumber } = month;
    const transformedFulllName = fullname?.replace(/ /g, "_");
    const details = {
      id,
      fullname: transformedFulllName,
      monthNumber,
    };

    return JSON.stringify(details);
  }

  static tdInnerHtmlPattern(month: ModelObjectString) {
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
    const currencyStyles = StateAmount.amount ? styles : "hidden";
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

  static getTableSums() {
    return this.copy(StateCalendar.sortedCalendar).map(
      (member: ModelMemberCalendar) => {
        return member.sum;
      }
    );
  }
}
