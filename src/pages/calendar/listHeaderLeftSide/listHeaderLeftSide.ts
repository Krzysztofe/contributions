import { ModelMemberCalendar } from "./../../../sharedModels/modelMemberCalendar";
import { ListCreator } from "../../../components/listCreator";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import { StateFillMode } from "../states/stateFillMode";
import { StateCalendar } from "../states/StateCalendar";
import { PdfPropsCreator } from "./pdfPropsCreator";

type ModelListCreator = {
  parentEl: string;
  iconsData: { iconSVG: string; dataAttribute: string }[];
};

export class ListHeaderLeftSide extends ListCreator {
  #liEl: HTMLElement | null = null;
  #iconFast: HTMLElement | null = null;
  #iconSlow: HTMLElement | null = null;

  constructor({ parentEl, iconsData }: ModelListCreator) {
    super(parentEl);
    this.#createLiElems(iconsData);
    this.#fastModeEvent();
    this.#slowModeEvent();
    this.#createPDFEvent();
  }

  #createLiElems(elementsData: { iconSVG: string; dataAttribute: string }[]) {
    elementsData.forEach(({ iconSVG, dataAttribute }, idx) => {
      this.#liEl = document.createElement("li");

        if (idx === 0) {
          this.#liEl.classList.add( "fill-accent");
        }

      if (idx === elementsData.length - 1) {
        this.#liEl.classList.add("hidden", "md:block");
      }

      if (idx === elementsData.length - 2) {
        this.#liEl.classList.add("hidden", "sm:block");
      }

      this.#liEl.classList.add(
        "fill-dark",
        "hover:opacity-50",
        "cursor-pointer",
        "w-4",
        "mr-8",
        "md:mr-6"
      );
      this.#liEl.setAttribute(dataAttribute, "");
      this.#liEl.innerHTML = `${iconSVG}`;

      this.ulEl?.append(this.#liEl);
      this.#iconFast = document.querySelector("[data-icon-rocket]");
      StateFillMode.isFast && this.#iconFast?.classList.add("text-accent");
      this.#iconSlow = document.querySelector("[data-icon-edit]");
    });
  }

  #handlefastMode() {
    this.#iconFast?.classList.add("fill-accent");
    this.#iconSlow?.classList.remove("fill-accent");
    StateFillMode.isFast = true;
  }
  #handleSlowMode() {
    this.#iconFast?.classList.remove("fill-accent");
    this.#iconSlow?.classList.add("fill-accent");
    StateFillMode.isFast = false;
  }

  #handleCreatePDF() {
    const propsData = new PdfPropsCreator();
    jsPDFInvoiceTemplate(
      propsData.createProps(
        StateCalendar.sortedCalendar as ModelMemberCalendar[]
      )
    );
  }

  #fastModeEvent() {
    this.#iconFast?.addEventListener("click", this.#handlefastMode.bind(this));
  }

  #slowModeEvent() {
    this.#iconSlow?.addEventListener("click", this.#handleSlowMode.bind(this));
  }

  #createPDFEvent() {
    document
      .querySelector("[data-icon-pdf]")
      ?.addEventListener("click", this.#handleCreatePDF.bind(this));
  }
}
