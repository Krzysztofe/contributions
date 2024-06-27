import { OutputType } from "jspdf-invoice-template";
import { Helpers } from "../../../utils/helpers";
import { ModelMemberCalendar } from "../../../sharedModels/modelMemberCalendar";
import { StateYear } from "../states/StateYear";

export class PdfPropsCreator {
  pdfProps: any;

  constructor(calendarMembers: any) {
    this.pdfProps = this.#createProps(calendarMembers);
  }

  #replacePolishLetters(text: string) {
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

  #createHeaderMonths() {
    return [
      "Sty.",
      "Lut.",
      "Mar.",
      "Kwi.",
      "Maj",
      "Cze.",
      "Lip.",
      "Sie.",
      "Wrz.",
      "Paz.",
      "Lis.",
      "Gru.",
    ].map(month => {
      return { title: month };
    });
  }

  #createTableMembers(calendarMembers: ModelMemberCalendar[]) {
    return calendarMembers.map((member, idx) => {
      const fullname = `${member.fullname
        .split(" ")
        .join("         ")}                             `;

      return [
        `${idx + 1}`,
        this.#replacePolishLetters(fullname),
        `${member.january.amount} zl`,
        `${member.february.amount} zl`,
        `${member.march.amount} zl`,
        `${member.april.amount} zl`,
        `${member.may.amount} zl`,
        `${member.june.amount} zl`,
        `${member.july.amount} zl`,
        `${member.august.amount} zl`,
        `${member.september.amount} zl`,
        `${member.october.amount} zl`,
        `${member.november.amount} zl`,
        `${member.december.amount} zl`,
      ];
    });
  }

  #createProps(calendarMembers: ModelMemberCalendar[]) {
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
          ...this.#createHeaderMonths(),
        ],
        table: this.#createTableMembers(calendarMembers),
      },
      pageEnable: true,
      pageLabel: "Strona ",
    };
  }
}
