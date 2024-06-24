import { LoadingButtonCreator } from "./../../../components/loadingsCreators/loadingButtonCreator";
import { Helpers } from "../../../utils/helpers";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { ReprintTr } from "./reprintTr";

export class MemberEditSubmit {
  #formEl = document.getElementById("popupMemberEdit");
  #formKeys: string[] | null = null;
  #btnLoader = new LoadingButtonCreator("btnEditMember");
  #memberId: string | null | undefined = null;
  #formValues: any | null = null;
  #trId: string | null | undefined = null;

  constructor(
    memberId: string | null | undefined,
    trId: string | null | undefined
  ) {
    this.#memberId = memberId;
    this.#trId = trId;
    this.#submitEvent();
  }

  // #processFormValues(): any {
  //   if (!this.#formKeys || !this.#formValues) {
  //     return {
  //       firstname: "",
  //       lastname: "",
  //       phone: "",
  //     };
  //   }

  //   return this.#formKeys.reduce((acc, key) => {
  //     if (this.#formValues) {
  //       acc[key.replace("Edit", "") as keyof any] = this.#formValues[key];
  //     }
  //     return acc;
  //   }, {} as any);
  // }

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
    const { phoneEdit, join_dateEdit } = this.#formValues;
    return {
      url: URL_MEMBERS,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        id: this.#memberId || "",
        phone: phoneEdit || "",
        join_date: join_dateEdit || "",
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
      this.#formValues.phoneEdit,
      this.#formValues.join_dateEdit
    );
    document.getElementById("popupContainer")?.remove();
  }

  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
