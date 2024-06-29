import { ModelMonth } from "./../../../sharedModels/modelMonth";
import { OutputType } from "jspdf-invoice-template";
import { Helpers } from "../../../utils/helpers";
import { ModelMemberCalendar } from "../../../sharedModels/modelMemberCalendar";
import { StateYear } from "../states/StateYear";
import { monthsEnglish, monthsPolish } from "../../../data/dataMonths";

export class PdfPropsCreator {
  #membersSumsElems = document.querySelectorAll('[data="sum"]');
  #joinMonthNumber: number | null = null;

  #getDataTableHead() {
    return monthsPolish.map(month => {
      return { title: month };
    });
  }

  #getFullname(member: ModelMemberCalendar) {
    const fullname = member.fullname.split(" ");
    fullname.push("");
    return Helpers.replacePolishLetters(fullname.join("\n"));
  }

  #getMonthAmount = (
    month: keyof ModelMemberCalendar,
    member: ModelMemberCalendar
  ) => {
    if (!this.#joinMonthNumber) return;
    const monthData = member[month] as ModelMonth;
    return this.#joinMonthNumber <= +monthData.monthNumber
      ? `${monthData.amount} zl`
      : " X";
  };

  #getMonthsAmounts(member: ModelMemberCalendar) {
    return monthsEnglish.map(month => {
      const monthData = member[month] as ModelMonth;
      const isJoinedInPrintedYear = monthData?.join_date.includes(
        StateYear.year
      );

      if (isJoinedInPrintedYear) {
        return this.#getMonthAmount(month, member);
      } else {
        return monthData.amount;
      }
    });
  }

  #getDataTableBody(calendarMembers: ModelMemberCalendar[]) {
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

  createProps(calendarMembers: ModelMemberCalendar[]) {
    return {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: `Składki ${Helpers.getCurrentMonth()}`,
      orientationLandscape: false,
      compress: true,

      contact: {
        name: `Zestawienie z ${StateYear.year} r.`,
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
            title: "Nazwisko",
            style: {
              width: 25,
            },
          },
          ...this.#getDataTableHead(),
        ],
        table: this.#getDataTableBody(calendarMembers),
      },
      pageEnable: true,
      pageLabel: "Strona ",
    };
  }
}
