import { LoadingButtonView } from "../../views/sharedViews/loadersViews/loadingButtonView";
import { ValidationGeneric } from "../../helpers/validationGeneric";
import { URL_MEMBERS } from "../../config/apiUrl";
import { TypeObjectString } from "../../sharedTypes/typeObjectString";
import { ReprintTrView } from "../../views/pages/settingsViews/tableSettings/reprintTrView";
import { HelpersForm } from "../../helpers/helpersForm";
import { HelpersAuth } from "../../helpers/helpersAuth";
import { HelpersHttp } from "../../helpers/helpersHttp";

export class EditMemberController {
  #formEl = document.getElementById("popupMemberEdit");
  #formKeys: string[] | null = null;
  #btnLoader = new LoadingButtonView("btnEditMember");
  #memberId: string | null | undefined = null;
  #formValues: TypeObjectString | null = null;
  #trId: string | null | undefined = null;

  constructor(
    memberId: string | null | undefined,
    trId: string | null | undefined
  ) {
    this.#memberId = memberId;
    this.#trId = trId;
    this.#submitEvent();
  }

  #validations(e: Event) {
    this.#formValues = HelpersForm.getFormValues(e);
    this.#formKeys = Object.keys(this.#formValues);

    const areErrors =
      this.#formKeys && new ValidationGeneric(this.#formKeys).errors;

    if (areErrors && areErrors.length > 0) return;
    return "go";
  }

  #PUTOptions() {
    return {
      url: URL_MEMBERS,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        id: this.#memberId || "",
        email: this.#formValues?.emailEdit || "",
      },
    };
  }

  async #handleSubmit(e: Event) {
    e.preventDefault();
    if (this.#validations(e) !== "go") return;
    this.#btnLoader.createSpinner();

    await HelpersHttp.fetchData(this.#PUTOptions());
    new ReprintTrView(this.#trId, this.#formValues?.emailEdit);
    document.getElementById("popupContainer")?.remove();
  }

  #submitEvent() {
    HelpersAuth.isUserLogged();
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
