import { TypeObjectString } from "../sharedTypes/typeObjectString";

export class HelpersTranslations {
  
  static numberOnMonthPolish(month: string) {
    const monthTranslations: TypeObjectString = {
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
    const monthTranslations: TypeObjectString = {
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
  }