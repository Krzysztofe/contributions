import { LoadingButtonCreator } from "./../../../components/loadingsCreators/loadingButtonCreator";
import { ModelObjectString } from "./../../../sharedModels/modelObjectString";
import { Helpers } from "../../../utils/helpers";
import { LoadingTableSettings } from "../loadingTableSettings";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { URL_MEMBERS } from "../../../data/dataUrl";

export class MemberEditSubmit {
  #formEl = document.getElementById("popupMemberEdit");
  #formKeys: string[] | null = null;
  // #loading = new LoadingTableSettings();
  #btnLoader = new LoadingButtonCreator("btnEditMember");

  #memberId: string | null = null;
  // #formValues: ModelObjectString | null = null;
  #formValues: any | null = null;
  constructor(id: any) {
    this.#memberId = id;
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
    const { firstnameEdit, lastnameEdit, phoneEdit, join_dateEdit } =
      this.#formValues;
    return {
      url: URL_MEMBERS,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        id: this.#memberId || "",
        firstname:
          (this.#formValues && Helpers.capitalize(firstnameEdit)) || "",
        lastname: (this.#formValues && Helpers.capitalize(lastnameEdit)) || "",
        phone: phoneEdit || "",
        join_date: join_dateEdit || "",
      },
    };
  }

  async #handleSubmit(e: Event) {
    e.preventDefault();
    if (this.#validations(e) !== "go") return;
    this.#btnLoader.createSpinner();
    const newMember = await Helpers.fetchData(this.#PUTOptions());
    
    document.getElementById("popupContainer")?.remove();
  }

  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
