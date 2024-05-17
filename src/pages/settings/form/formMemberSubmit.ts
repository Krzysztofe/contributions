import { URL_MEMBERS } from "../../../data/dataUrl";
import { capitalize } from "../../../utils/capitalize";
import { getFormValues } from "../../../utils/getFormValues";
import { StateMembers } from "../../../components/stateMembers";
import { ValidationMember } from "../validationMember";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { LoadingTableSettings } from "../loadingTableSettings";
import { Helpers } from "../../../utils/helpers";
import { TableMembersPrinter } from "../tableMembersPrinter";
import { AlertCreator } from "../../../components/alertCreator";
import { ToastPrinter } from "../../../components/toastPrinter";

export class FormMemberSubmit {
  #formEl = document.querySelector("form");
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
        firstname: capitalize(getFormValues(e).firstname),
        lastname: capitalize(getFormValues(e).lastname),
        phone: getFormValues(e).phone,
      },
    };
  }
  
  #createNewMembers(fetchedData: any) {
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
    this.#formKeys = Object.keys(getFormValues(e));
    if (this.#validations(e) !== "go") return;

    // POST Member Request;

    this.#loading.createLoading();
    const data = await Helpers.fetchData(this.#POSTOptions(e));
    document.querySelector("table")?.remove();
    const newMembers = this.#createNewMembers(data?.fetchedData);
    StateMembers.processMembers(newMembers);
    document.getElementById("noDataContainer")?.remove();
    new TableMembersPrinter();
    new AlertCreator("sectionTable", "tableMembers");
    this.#loading.removeFormErrors();
    this.#loading.removeLoading();
    new ToastPrinter("Zapisano");
  }

  submitEvent() {
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
