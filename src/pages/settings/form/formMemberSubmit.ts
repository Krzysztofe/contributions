import { ModelObjectString } from "./../../../sharedModels/modelObjectString";
import { StateMembers } from "../../../components/stateMembers";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { Helpers } from "../../../utils/helpers";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { LoadingTableSettings } from "../loadingTableSettings";
import { ReprintSettingsPanel } from "../reprintSettingsPanel";
import { ValidationMember } from "../validationMember";
import { ModelObjectAny } from "../../../sharedModels/modelObjectAny";
import { ToastPrinter } from "../../../components/toastPrinter";

export class FormMemberSubmit {
  #formEl = document.querySelector("form");
  #errorsElems = document.querySelectorAll(".h-4");
  #noDataEl = document.getElementById("noDataContainer");
  #formKeys: string[] | null = null;
  #loading = new LoadingTableSettings();
  #formValues: ModelObjectString | null = null;

  constructor() {
    this.#submitEvent();
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
        phone: this.#formValues?.phone || "",
        join_date: this.#formValues?.join_date || "",
      },
    };
  }

  #createNewMembers(fetchedMember: ModelObjectAny) {
    const { firstname, lastname, phone, id, join_date } = fetchedMember;

    const newMember = {
      fullname: `${lastname} ${firstname}`,
      phone,
      id,
      join_date: join_date.slice(0, -3),
    };

    return [...StateMembers.sortedMembers, newMember];
  }

  #processFormValues() {
    const processFormValues = this.#formKeys?.map(key => {
      return { [key]: this.#formValues?.[key] };
    });
    return processFormValues && Object.assign({}, ...processFormValues);
  }

  #validations() {
    this.#errorsElems.forEach(error => ((error as HTMLElement).innerText = ""));

    const areErrors =
      this.#formKeys && new ValidationGeneric(this.#formKeys).errors;

    if (areErrors && areErrors.length > 0) return;

    const isMemberRecord = new ValidationMember(
      StateMembers.sortedMembers,
      this.#processFormValues()
    ).isMember;
    if (isMemberRecord.length > 0) return;
    return "go";
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.#formValues = Helpers.getFormValues(e);
    this.#formKeys = Object.keys(this.#formValues);
    if (this.#validations() !== "go") return;

    this.#loading.createLoading();
    const newMember = await Helpers.fetchData(this.#POSTOptions());
    const newMembers = this.#createNewMembers(newMember);
    this.#noDataEl?.remove();
    StateMembers.setMembers(newMembers);
    new ReprintSettingsPanel();
    this.#formEl?.reset()
    this.#loading.removeLoading();
    new ToastPrinter("Zapisano");
  }

  #submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
