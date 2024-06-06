import { ListCreator } from "../../../components/listCreator";
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import { StateFillMode } from "../states/stateFillMode";

type ModelListCreator = {
  parentEl: string;
  elementsData: { iconClass: string }[];
};

export class ListHeaderLeftSide extends ListCreator {
  #liEl: HTMLElement | null = null;
  #iEl: HTMLElement | null = null;
  #iconFast: HTMLElement | null = null;
  #iconSlow: HTMLElement | null = null;

  constructor({ parentEl, elementsData }: ModelListCreator) {
    super(parentEl);
    this.#createLiElems(elementsData);
    this.#eventFastMode();
    this.#eventSlowMode();
    this.#eventCreatePDF();
  }

  #createLiElems(elementsData: { iconClass: string }[]) {

    elementsData.forEach(({ iconClass }: { iconClass: string }, idx) => {
      
      this.#liEl = document.createElement("li");
      idx === elementsData.length - 1 &&
        this.#liEl.classList.add("hidden", "sm:block");

      this.#iEl = document.createElement("span");
      this.#iEl.classList.add("fa-solid", iconClass, "mr-8", "cursor-pointer");

      this.#liEl.append(this.#iEl);
      this.ulEl?.append(this.#liEl);
      this.#iconFast = document.querySelector(".fa-forward");
      StateFillMode.isFast && this.#iconFast?.classList.add("text-accent");
      this.#iconSlow = document.querySelector(".fa-pen-to-square");
    });
  }

  #handlefastMode() {
    this.#iconFast?.classList.add("text-accent");
    this.#iconSlow?.classList.remove("text-accent");
    StateFillMode.isFast = true;
  }
  #handleSlowMode() {
    this.#iconFast?.classList.remove("text-accent");
    this.#iconSlow?.classList.add("text-accent");
    StateFillMode.isFast = false;
  }

  #handleCreatePDF() {
    jsPDFInvoiceTemplate(props);
  }

  #eventFastMode() {
    this.#iconFast?.addEventListener("click", this.#handlefastMode.bind(this));
  }

  #eventSlowMode() {
    this.#iconSlow?.addEventListener("click", this.#handleSlowMode.bind(this));
  }

  #eventCreatePDF() {
    document
      .querySelector(".fa-file-pdf")
      ?.addEventListener("click", this.#handleCreatePDF.bind(this));
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
