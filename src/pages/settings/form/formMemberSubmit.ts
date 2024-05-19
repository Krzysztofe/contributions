import { StateMembers } from "../../../components/stateMembers";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { getFormValues } from "../../../utils/getFormValues";
import { Helpers } from "../../../utils/helpers";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { LoadingTableSettings } from "../loadingTableSettings";
import { RecreateSettingPanel } from "../recreateSettingsPanel";
import { ValidationMember } from "../validationMember";

export class FormMemberSubmit {
  #formEl = document.querySelector("form");
  #errorsEL = document.querySelectorAll(".h-4");
  #formKeys: string[] | null = null;
  #loading = new LoadingTableSettings();

  constructor() {
    this.submitEvent();
  }

  #POSTOptions(e: SubmitEvent) {
    return {
      url: URL_MEMBERS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        firstname: Helpers.capitalize(getFormValues(e).firstname),
        lastname: Helpers.capitalize(getFormValues(e).lastname),
        phone: Helpers.getFormValues(e).phone,
      },
    };
  }

  #createNewMembers(fetchedData: { [key: string]: any }) {
    const { firstname, lastname, phone, id } = fetchedData;
    const newMember = { fullname: `${firstname} ${lastname}`, phone, id };
    return [...StateMembers.sortedMembers, newMember];
  }

  formValues(e: SubmitEvent) {
    const processFormValues = this.#formKeys?.map(item => {
      return { [item]: getFormValues(e)[item] };
    });
    return processFormValues && Object.assign({}, ...processFormValues);
  }

  #validations(e: SubmitEvent) {
    this.#errorsEL.forEach(error => ((error as HTMLElement).innerText = ""));

    const errors =
      this.#formKeys && new ValidationGeneric(this.#formKeys).errors;

    if (errors && errors.length > 0) return;

    const isMember = new ValidationMember(
      StateMembers.sortedMembers,
      this.formValues(e)
    ).isMember;
    if (isMember.length > 0) return;
    return "go";
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.#formKeys = Object.keys(Helpers.getFormValues(e));
    if (this.#validations(e) !== "go") return;

    // POST Member Request;

    this.#loading.createLoading();
    const data = await Helpers.fetchData(this.#POSTOptions(e));
    // this.#formEl?.reset();
    const newMembers = this.#createNewMembers(data?.fetchedData);
    document.getElementById("noDataContainer")?.remove();

    new RecreateSettingPanel(newMembers, "Zapisano");
  }

  submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
