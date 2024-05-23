import { HttpRequest } from "../services/httpRequest";
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

    const formValues: { [key: string]: string } = {};

    if (formData) {
      for (const [key, value] of formData.entries()) {
        formValues[key] = (value as string).trim();
      }
    }

    return formValues;
  }

  static debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: any;
    const timeoutFunction = (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
    return timeoutFunction;
  }

  static sortList(array: { [key: string]: string }[]) {
    const sortedList = array.sort((a, b) => {
      let nameA = a.fullname.toLowerCase();
      let nameB = b.fullname.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return sortedList;
  }

  static translateMonth(month: string) {
    const monthTranslations: { [key: string]: string } = {
      january: "Styczeń",
      february: "Luty",
      march: "Marzec",
      april: "Kwiecień",
      may: "Maj",
      june: "Czerwiec",
      july: "Lipiec",
      august: "Sierpień",
      september: "Wrzesień",
      october: "Październik",
      november: "Listopad",
      december: "Grudzień",
    };

    return monthTranslations[month.toLowerCase()] || "";
  }
}
