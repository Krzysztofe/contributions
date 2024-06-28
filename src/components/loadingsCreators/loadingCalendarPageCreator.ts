import { ModelMemberCalendar } from './../../sharedModels/modelMemberCalendar';

export class LoadigCalendarPageCreator {
  #loadingContenerEl = document.getElementById("loadingConteiner");

  constructor(values: ModelMemberCalendar[]) {
    this.handleLoad(values);
  }

  handleLoad(values: ModelMemberCalendar[]) {
    if (values) {
      this.#loadingContenerEl && (this.#loadingContenerEl.style.opacity = "0");

      setTimeout(() => {
        this.#loadingContenerEl?.classList.add("hidden");
      }, 200);
    }
  }
}
