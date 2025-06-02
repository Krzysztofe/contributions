import { TypeMonth } from "../sharedTypes/typeMonth";
import { OutputType } from "jspdf-invoice-template";
import { Helpers } from "./helpers";
import { TypeMemberCalendar } from "../sharedTypes/typeMemberCalendar";
import { printedYearModel } from "../models/calendarModels/printedYearModel";
import { monthsEnglish, monthsPolish } from "../constans/monthsConstants";

export class PdfPropsCreator {
  #membersSumsElems = document.querySelectorAll("[data-sum-to-pay]");
  #joinMonthNumber: number | null = null;

  #getDataTableHead() {
    return monthsPolish.map((month) => {
      return { title: month };
    });
  }

  #getFullname(member: TypeMemberCalendar) {
    const fullname = member.fullname.split(" ");
    fullname.push("");
    return Helpers.replacePolishLetters(fullname.join("\n"));
  }

  #getMonthAmount = (
    month: keyof TypeMemberCalendar,
    member: TypeMemberCalendar
  ) => {
    if (!this.#joinMonthNumber) return;
    const monthData = member[month] as TypeMonth;
    return this.#joinMonthNumber <= +monthData.monthNumber
      ? `${monthData.amount} zl`
      : " --";
  };

  #getMonthsAmounts(member: TypeMemberCalendar) {
    return monthsEnglish.map((month) => {
      const monthData = member[month] as TypeMonth;
      const isJoinedInPrintedYear = monthData?.join_date.includes(
        printedYearModel.year
      );

      if (isJoinedInPrintedYear) {
        return this.#getMonthAmount(month, member);
      } else {
        return monthData.amount;
      }
    });
  }

  #getDataTableBody(calendarMembers: TypeMemberCalendar[]) {
    const sums = Array.from(this.#membersSumsElems)?.map(
      (el: any) => el.textContent
    );

    return calendarMembers.map((member, idx) => {
      const joinMonth = member.join_date?.split("-")[1];
      this.#joinMonthNumber = joinMonth ? parseInt(joinMonth, 10) : null;

      return [
        `${idx + 1}`,
        this.#getFullname(member),
        ...this.#getMonthsAmounts(member),
        `${sums[idx].replace("zł", "")}zl`,
      ];
    });
  }

  createProps(calendarMembers: TypeMemberCalendar[]) {
    return {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: `Składki ${Helpers.getCurrentMonth()}`,
      orientationLandscape: false,
      compress: true,

      contact: {
        name: `Zestawienie składek z ${printedYearModel.year} r.`,
        phone: `Data: ${Helpers.getCurrentDate()}`,
        email: `Godzina: ${Helpers.getCurrentHour()} `,
      },

      invoice: {
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: `${calendarMembers.length}`,
            style: {
              width: 8,
            },
          },
          {
            title: "Osoba",
            style: {
              width: 25,
            },
          },
          ...this.#getDataTableHead(),
          {
            title: "Suma",
            style: {
              width: 18,
            },
          },
        ],
        table: this.#getDataTableBody(calendarMembers),
      },
      pageEnable: true,
      pageLabel: `Strona `,
    };
  }
}
