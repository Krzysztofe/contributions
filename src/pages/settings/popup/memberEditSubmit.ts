import { ValidationMember } from "./../validationMember";
import { LoadingButtonCreator } from "./../../../components/loadingsCreators/loadingButtonCreator";
// import { ModelObjectString } from "./../../../sharedModels/modelObjectString";
import { Helpers } from "../../../utils/helpers";
// import { LoadingTableSettings } from "../loadingTableSettings";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { StateMembers } from "../stateMembers";

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

  #processFormValues(): any {
    if (!this.#formKeys || !this.#formValues) {
      return {
        firstname: "",
        lastname: "",
        phone: "",
      };
    }

    return this.#formKeys.reduce((acc, key) => {
      if (this.#formValues) {
        acc[key.replace("Edit", "") as keyof any] = this.#formValues[key];
      }
      return acc;
    }, {} as any);
  }

  #validations(e: Event) {
    this.#formValues = Helpers.getFormValues(e);
    this.#formKeys = Object.keys(this.#formValues);

    const areErrors =
      this.#formKeys && new ValidationGeneric(this.#formKeys).errors;

    console.log("sub", areErrors);

    if (areErrors && areErrors.length > 0) return;
    return "go";
  }

  #PUTOptions() {
    const { firstnameEdit, lastnameEdit, phoneEdit, join_dateEdit } =
      this.#formValues;

    console.log("", join_dateEdit);
    return {
      url: URL_MEMBERS,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        id: this.#memberId || "",
        // firstname: "",
        // lastname: "",
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
    console.log("", newMember);
    document.getElementById("popupContainer")?.remove();
  }

  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
