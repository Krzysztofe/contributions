import { ModelObjectString } from "./../../../sharedModels/modelObjectString";
import { StateMembers } from "../stateMembers";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { Helpers } from "../../../utils/helpers";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { LoadingTableSettings } from "../loadingTableSettings";
import { ReprintSettingsPanel } from "../reprintSettingsPanel";
import { ValidationMember } from "../validationMember";
import { ModelObjectAny } from "../../../sharedModels/modelObjectAny";
import { ToastPrinter } from "../../../components/toastPrinter";
import { ModelNewMember } from "../../../sharedModels/modelNewMember";

export class FormMemberSubmit {
  #formEl = document.querySelector("form");
  #errorsElems = document.querySelectorAll(".h-4");
  #formKeys: string[] | null = null;
  #loading = new LoadingTableSettings();
  #formValues: ModelObjectString | null = null;

  constructor() {
    this.#submitEvent();
  }

  #createNewMembers(fetchedMember: ModelObjectAny) {
    const { firstname, lastname, email, id, join_date } = fetchedMember;

    const newMember = {
      fullname: `${lastname} ${firstname}`,
      email,
      id,
      join_date: join_date?.slice(0, -3),
    };

    return StateMembers.sortedMembers
      ? [...StateMembers.sortedMembers, newMember]
      : [newMember];
  }

  #processFormValues(): ModelNewMember {
    if (!this.#formKeys || !this.#formValues) {
      return {
        firstname: "",
        lastname: "",
        email: "",
      };
    }

    return this.#formKeys.reduce((acc, key) => {
      if (this.#formValues) {
        acc[key as keyof ModelNewMember] = this.#formValues[key];
      }
      return acc;
    }, {} as ModelNewMember);
  }

  #clearErrors() {
    this.#errorsElems.forEach(error => ((error as HTMLElement).innerText = ""));
  }

  #validations(e: Event) {
    this.#clearErrors();
    this.#formValues = Helpers.getFormValues(e);
    this.#formKeys = Object.keys(this.#formValues);
    const areErrors =
      this.#formKeys && new ValidationGeneric(this.#formKeys).errors;

    if (areErrors && areErrors.length > 0) return;

    const isMemberRecord = new ValidationMember(
      StateMembers.sortedMembers,
      this.#processFormValues()
    ).isMember;
    if (isMemberRecord?.length > 0) return;
    return "go";
  }

  #POSTOptions() {
    return {
      url: URL_MEMBERS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        firstname:
          (this.#formValues &&
            Helpers.capitalize(this.#formValues.firstname)) ||
          "",
        lastname:
          (this.#formValues && Helpers.capitalize(this.#formValues.lastname)) ||
          "",
        email: this.#formValues?.email || "",
        join_date: this.#formValues?.join_date || "",
      },
    };
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.#validations(e) !== "go") return;

    this.#loading.createLoading();
    const newMember = await Helpers.fetchData(this.#POSTOptions());
    const newMembers = this.#createNewMembers(newMember);
    document.getElementById("noDataContainer")?.remove();
    StateMembers.setMembers(newMembers);
    new ReprintSettingsPanel();
    this.#formEl?.reset();
    this.#loading.removeLoading();
    new ToastPrinter("Zapisano");
  }

  #submitEvent() {
    Helpers.isUserLoged();
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
