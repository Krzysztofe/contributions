import { PopupView } from "../../../views/sharedViews/popupView";
import { fillModeModel } from "../../../models/calendarModels/fillModeModel";
import { Helpers } from "../../../utils/helpers";
import { FormMonthDetailsBuilder } from "../../../views/pages/calendarViews/formCreateMonthDetails/formMonthDetailsBuilder";
import { UpdateMonthAmountController } from "../updateMonthAmountController";

export class PopupMonthDetailsController {
  tableBodyEl = document.querySelector("tbody");
  #eventTarget: HTMLElement | null = null;

  constructor() {
    this.#printPopupEvent();
  }

  #closeCollapse() {
    document
      .querySelectorAll("[data=memberDetailsPrint]")
      .forEach((element) => {
        element.classList.remove("collapseOpen");
      });

    document.querySelectorAll("[data-parent-id]").forEach((icon) => {
      icon.classList.remove("rotate-180");
    });
  }

  #handleUpdateMonth(e: Event) {
    this.#eventTarget = e.target as HTMLElement;
    const isNestedInTd = Helpers.isNestedEl("td", this.#eventTarget);
    const dataAttribute = this.#eventTarget?.getAttribute("data");
    const isIconArrow = this.#eventTarget.hasAttribute("data-icon-chevron");
    const isDataNotActive = this.#eventTarget?.getAttribute("data-not-active");

    const shouldProcess =
      dataAttribute !== "member" &&
      dataAttribute !== "idx" &&
      dataAttribute !== "sum" &&
      !isIconArrow &&
      !isDataNotActive &&
      isNestedInTd;

    if (!fillModeModel.isFast && shouldProcess) {
      this.#closeCollapse();
      new PopupView().createPopupContainetr();
      new FormMonthDetailsBuilder(this.#eventTarget);
    } else if (fillModeModel.isFast && shouldProcess) {
      this.#closeCollapse();
      new UpdateMonthAmountController(this.#eventTarget);
    }
  }

  #printPopupEvent() {
    Helpers.isUserLoged();
    this.tableBodyEl?.addEventListener(
      "click",
      this.#handleUpdateMonth.bind(this)
    );
  }
}
