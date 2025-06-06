import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import { fillModeModel } from "../../models/calendarModels/fillModeModel";
import { HelpersPdfPropsCreator } from "../../helpers/helpersPdfPropsCreator";
import { CalendarModel } from "../../models/calendarModels/calendarModel";
import { TypeMemberCalendar } from "../../sharedTypes/typeMemberCalendar";
import { HelpersAuth } from "../../helpers/helpersAuth";

export class ListHeaderLeftSideController {
  #iconFast: HTMLElement | null = null;
  #iconSlow: HTMLElement | null = null;

  constructor() {
    this.#iconFast = document.querySelector("[data-icon-rocket]");
    this.#iconSlow = document.querySelector("[data-icon-edit]");
    this.#fastModeEvent();
    this.#slowModeEvent();
    this.#createPDFEvent();
  }

  #handlefastMode() {
    this.#iconFast?.classList.add("fill-accent");
    this.#iconFast?.classList.remove("fill-dark");
    this.#iconSlow?.classList.remove("fill-accent");
    this.#iconSlow?.classList.add("fill-dark");
    fillModeModel.isFast = true;
  }
  #handleSlowMode() {
    this.#iconFast?.classList.remove("fill-accent");
    this.#iconFast?.classList.add("fill-dark");
    this.#iconSlow?.classList.remove("fill-dark");
    this.#iconSlow?.classList.add("fill-accent");
    fillModeModel.isFast = false;
  }

  #handleCreatePDF() {
    const propsData = new HelpersPdfPropsCreator();
    jsPDFInvoiceTemplate(
      propsData.createProps(
        CalendarModel.sortedCalendar as TypeMemberCalendar[]
      )
    );
  }

  #fastModeEvent() {
    HelpersAuth.isUserLogged();
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
