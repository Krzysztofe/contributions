import { HeaderLogedIn } from "../../components/headerCreator/headerCreator";
import { dataAmountInput } from "../../components/headerCreator/dataInputs";
import { StateAmount } from "./states/StateAmount";
import { LoadingSpinner } from "../../components/loadingsCreators/loadingSpinner";
import { Helpers } from "../../utils/helpers";
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

export class HeaderCalendar extends HeaderLogedIn {
  #h1 = document.querySelector("h1");
  #navEl = document.querySelector("nav");

  constructor(styles: string[]) {
    super(styles);
    this.#createInputAmount();
    this.#createPdfIcon();
  }

  async #handleChangeInput(e: Event) {
    const spinner = new LoadingSpinner("#defaultAmount");
    spinner.createSpinner();
    const inputValue = (e.target as HTMLInputElement).value;
    StateAmount.amount = inputValue;
    spinner.removeSpinner();
  }

  #createInputAmount() {
    dataAmountInput.forEach(input => {
      this.#navEl?.append(
        this.form.createInput(input, [
          "absolute",
          "w-20",
          "lg:w-20",
          "-top-[2px]",
          "lg:top-0",
          "right-[100%]",
          "hidden",
          "md:block",
          "pr-0",
        ])
      );
    });

    const inputEl = document.getElementById("defaultAmount");

    if (inputEl) {
      inputEl.addEventListener(
        "input",
        Helpers.debounce(this.#handleChangeInput.bind(this), 1500)
      );
    }
  }

  #createPdfIcon() {
    const iconEl = document.createElement("i");
    iconEl.classList.add(
      "fa-sharp",
      "fa-solid",
      "fa-file-pdf",
      "hidden",
      "sm:inline-block",
      "text-lg",
      "ml-8",
      "cursor-pointer"
    );
    this.#h1?.append(iconEl);
    iconEl?.addEventListener("click", this.#handleCreatePDF.bind(this));
  }
  #handleCreatePDF() {
    jsPDFInvoiceTemplate(props);
  }
}

// const pdfObject = jsPDFInvoiceTemplate(props); //returns number of pages created

//or in browser
// const pdfObject = jsPDFInvoiceTemplate(props)
//returns number of pages created

let props = {
  outputType: OutputType.Save,
  // onJsPDFDocCreation?: (jsPDFDoc: jsPDF) => void, //Allows for additional configuration prior to writing among others, adds support for different languages and symbols
  returnJsPDFDocObject: true,
  fileName: "Składki 2024",
  orientationLandscape: false,
  compress: true,
  // logo: {
  //     src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
  //     type: 'PNG', //optional, when src= data:uri (nodejs case)
  //     width: 53.33, //aspect ratio = width/height
  //     height: 26.66,
  //     margin: {
  //         top: 0, //negative or positive num, from the current position
  //         left: 0 //negative or positive num, from the current position
  //     }
  // },

  // business: {
  //   name: "Zestawienie skladek OZZ Inicjatywa Pracownicza Jeremias",
  //   // address: "Zestawienie skladek komisji",
  //   // phone: "OZZIP Jeremias",
  //   // email: "email@example.com",
  //   // email_1: "info@example.al",
  //   // website: "www.example.al",
  // },
  // contact: {
  //   label: "Invoice issued for:",
  //   name: "Client Name",
  //   address: "Albania, Tirane, Astir",
  //   phone: "(+355) 069 22 22 222",
  //   email: "client@website.al",
  //   otherInfo: "www.website.al",
  // },
  invoice: {
    // label: "Invoice #: ",
    // num: 19,
    // invDate: "Payment Date: 01/01/2021 18:12",
    // invGenDate: "Invoice Date: 02/02/2021 10:17",
    // headerBorder: false,
    // tableBodyBorder: false,
    header: [
      {
        title: "#",
        style: {
          width: 10,
        },
      },
      {
        title: "Title",
        style: {
          width: 30,
        },
      },
      {
        title: "Description",
        style: {
          width: 80,
        },
      },
      { title: "Price" },
      { title: "Quantity" },
      { title: "Unit" },
      { title: "Total" },
    ],
    table: Array.from(Array(50), index => [
      index + 1,
      "There are many variations ",
      "Lorem Ipsum is simply dummy text dummy text ",
      200.5,
      4.5,
      "m2",
      400.5,
    ]),
  },

  pageEnable: true,
  pageLabel: "Strona ",
};
