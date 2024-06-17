import { TableCalendar } from "../table/tableCalendar";

export class ReprintAllTdSums {
  #tdSumElems = document.querySelectorAll("[data=sum]");
  #table = new TableCalendar("sectionTable");

  constructor() {
    this.#reprintTdElems();
  }

  #reprintTdElems() {
    this.#tdSumElems.forEach(elem => elem.remove());
    this.#table.createTdSums();
  }
}
