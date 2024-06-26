import { LoadingButtonCreator } from "./../../../components/loadingsCreators/loadingButtonCreator";
import { Helpers } from "../../../utils/helpers";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { ReprintTr } from "./reprintTr";
import { ModelObjectString } from "../../../sharedModels/modelObjectString";

export class MemberEditSubmit {
  #formEl = document.getElementById("popupMemberEdit");
  #formKeys: string[] | null = null;
  #btnLoader = new LoadingButtonCreator("btnEditMember");
  #memberId: string | null | undefined = null;
  #formValues: ModelObjectString | null = null;
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
    this.#formValues = Helpers.getFormValues(e);
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
        phone: this.#formValues?.phoneEdit || "",
      },
    };
  }

  async #handleSubmit(e: Event) {
    e.preventDefault();
    if (this.#validations(e) !== "go") return;
    this.#btnLoader.createSpinner();
    await Helpers.fetchData(this.#PUTOptions());
    new ReprintTr(
      this.#trId,
      this.#formValues?.phoneEdit,
    );
    document.getElementById("popupContainer")?.remove();
  }

  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
