import { CalendarModel } from "../../../models/calendarModels/calendarModel";
import { ListView } from "../../sharedViews/listView";

type TypeListView = {
  parentEl: string;
  iconsData: { iconSVG: string; dataAttribute: string; tooltip: string }[];
};

export class ListHeaderLeftSide extends ListView {
  #liEl: HTMLElement | null = null;
  #tooltipEl: HTMLElement | null = null;

  constructor({ parentEl, iconsData }: TypeListView) {
    super(parentEl);
    CalendarModel.sortedCalendar.length > 0 && this.#createLiElems(iconsData);
  }

  #createLiElems(
    elementsData: { iconSVG: string; dataAttribute: string; tooltip: string }[]
  ) {
    elementsData.forEach(({ iconSVG, dataAttribute, tooltip }, idx) => {
      this.#tooltipEl = document.createElement("div");
      this.#tooltipEl.classList.add(
        "tooltip",
        "min-w-16",
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
        "w-10",
        "h-10",
        "flex",
        "justify-center",
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
        this.#liEl.classList.add("hidden", "md:flex");
      }

      if (idx === elementsData.length - 2) {
        this.#liEl.classList.add("hidden", "sm:flex");
      }

      this.#liEl.setAttribute(dataAttribute, "");
      this.#liEl.innerHTML = `<button class = "block w-4">${iconSVG}</button>`;

      this.#liEl.append(this.#tooltipEl);
      this.ulEl?.append(this.#liEl);
    });
  }
}
