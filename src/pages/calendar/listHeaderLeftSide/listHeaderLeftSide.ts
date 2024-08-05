import { ModelMemberCalendar } from "./../../../sharedModels/modelMemberCalendar";
import { ListCreator } from "../../../components/listCreator";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import { StateFillMode } from "../states/stateFillMode";
import { StateCalendar } from "../states/StateCalendar";
import { PdfPropsCreator } from "./pdfPropsCreator";

type ModelListCreator = {
  parentEl: string;
  iconsData: { iconSVG: string; dataAttribute: string; tooltip: string }[];
};

export class ListHeaderLeftSide extends ListCreator {
  #liEl: HTMLElement | null = null;
  #tooltipEl: HTMLElement | null = null;
  #iconFast: HTMLElement | null = null;
  #iconSlow: HTMLElement | null = null;

  constructor({ parentEl, iconsData }: ModelListCreator) {
    super(parentEl);
    StateCalendar.sortedCalendar.length > 0 && this.#createLiElems(iconsData);
    this.#fastModeEvent();
    this.#slowModeEvent();
    this.#createPDFEvent();
  }

  #createLiElems(
    elementsData: { iconSVG: string; dataAttribute: string; tooltip: string }[]
  ) {
    elementsData.forEach(({ iconSVG, dataAttribute, tooltip }, idx) => {
      this.#tooltipEl = document.createElement("div");
      this.#tooltipEl.classList.add(
        "tooltip",
        "text-xs",
        "text-white",
        "p-1",
        "px-2",
        "rounded",
        "bg-grey_primary",
        "absolute",
        "top-11",
        "left-0"
      );
      this.#tooltipEl.textContent = tooltip;

      this.#liEl = document.createElement("li");
      this.#liEl.classList.add(
        "fill-dark",
        "cursor-pointer",
        "w-8",
        "p-2",
        "mr-4",
        "md:mr-3",
        "rounded-full",
        "relative",
        "hover:bg-hover_bg",
        "hover-tooltip"
      );

      if (idx === 0) {
        this.#liEl.classList.add("fill-accent");
        this.#liEl.classList.remove("fill-dark");
      }

      if (idx === elementsData.length - 1) {
        this.#liEl.classList.add("hidden", "md:block");
      }

      if (idx === elementsData.length - 2) {
        this.#liEl.classList.add("hidden", "sm:block");
      }

      this.#liEl.setAttribute(dataAttribute, "");
      this.#liEl.innerHTML = `<button class = "block w-4">${iconSVG}</button>`;

      this.#liEl.append(this.#tooltipEl);
      this.ulEl?.append(this.#liEl);
      this.#iconFast = document.querySelector("[data-icon-rocket]");
      this.#iconSlow = document.querySelector("[data-icon-edit]");
    });
  }

  #handlefastMode() {
    this.#iconFast?.classList.add("fill-accent");
    this.#iconFast?.classList.remove("fill-dark");
    this.#iconSlow?.classList.remove("fill-accent");
    this.#iconSlow?.classList.add("fill-dark");
    StateFillMode.isFast = true;
  }
  #handleSlowMode() {
    this.#iconFast?.classList.remove("fill-accent");
    this.#iconFast?.classList.add("fill-dark");
    this.#iconSlow?.classList.remove("fill-dark");
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
