import { HttpRequest } from "../services/httpRequest";
import { ModelMonth } from "../sharedModels/modelMonth";
import { ModelObjectAny } from "../sharedModels/modelObjectAny";
import { ModelObjectString } from "../sharedModels/modelObjectString";
import { ModelRequestOptions } from "../sharedModels/modelRequestOptions";

export class Helpers {
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

  static sortList(array: ModelObjectAny[]) {
    const sortedList = array.sort((a, b) => {
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

  static numberOnMonth(month: string) {
    const monthTranslations: ModelObjectString = {
      "1": "Sty.",
      "2": "Lut.",
      "3": "Mar.",
      "4": "Kwi.",
      "5": "Maj",
      "6": "Cze.",
      "7": "Lip.",
      "8": "Sie.",
      "9": "Wrz.",
      "10": "Paź.",
      "11": "Lis.",
      "12": "Gru.",
    };

    return monthTranslations[month.toLowerCase()] || "";
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

  static tdInnerHtmlPattern(month:  ModelObjectString) {
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
        <div ${dataMonthId} ${dataMonthDetails} class = "text-[0.6rem] ${
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

  static currentYear() {
    return new Date().getFullYear().toString();
  }
}
