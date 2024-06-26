import { ListCreator } from "../../../components/listCreator";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import { StateFillMode } from "../states/stateFillMode";
import { StateCalendar } from "../states/StateCalendar";
import { PdfPropsCreator } from "./pdfPropsCreator";

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
    this.#fastModeEvent();
    this.#slowModeEvent();
    this.#createPDFEvent();
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
      this.#iconFast = document.querySelector(".fa-rocket");
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
    const propsData = new PdfPropsCreator(StateCalendar.sortedCalendar);
    jsPDFInvoiceTemplate(propsData.pdfProps);
  }

  #fastModeEvent() {
    this.#iconFast?.addEventListener("click", this.#handlefastMode.bind(this));
  }

  #slowModeEvent() {
    this.#iconSlow?.addEventListener("click", this.#handleSlowMode.bind(this));
  }

  #createPDFEvent() {
    document
      .querySelector(".fa-file-pdf")
      ?.addEventListener("click", this.#handleCreatePDF.bind(this));
  }
}
