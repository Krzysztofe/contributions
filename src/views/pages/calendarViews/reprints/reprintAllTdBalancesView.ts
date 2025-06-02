import { TableCalendarView } from "../table/tableCalendarView";

export class ReprintAllTdBalancesView {
  #tdSumElems = document.querySelectorAll("[data=sum]");
  #table = new TableCalendarView("sectionTable");

  constructor() {
    this.#reprintTdElems();
  }

  #reprintTdElems() {
    this.#tdSumElems.forEach((elem) => elem.remove());
    this.#table.createTdYearBalances();
    this.#table.createTdTotalBalances();
  }
}
