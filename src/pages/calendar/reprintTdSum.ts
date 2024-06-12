import { Helpers } from "../../utils/helpers";
import { TableCalendar } from "./table/tableCalendar";

export class ReprintTdSum {
  #tdSumElems = document.querySelectorAll("[data=sum]");
  #table = new TableCalendar("sectionTable");

  constructor() {
    this.#reprintTdElems();
  }

  #reprintTdElems() {
    this.#tdSumElems.forEach(elem => elem.remove());
    this.#table.createTdSum(Helpers.getTableSums());
  }
}
