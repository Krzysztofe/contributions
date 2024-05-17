import { AlertCreator } from "../../../components/alertCreator";
import { FormCreator } from "../../../components/formsCreators/formCreator";
import { ToastPrinter } from "../../../components/toastPrinter";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { capitalize } from "../../../utils/capitalize";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { TableMembersPrinter } from "../tableMembersPrinter";
import { ValidationMember } from "../validationMember";
import { getFormValues } from "./../../../utils/getFormValues";
import { HttpRequest } from "../../../services/httpRequest";
import { StateMembers } from "../../../components/stateMembers";
import { LoadingTableSettings } from "../loadingTableSettings";
import { Helpers } from "../../../utils/helpers";

export class FormCreateMember extends FormCreator {
  formKeys: string[] | null = null;
  request = new HttpRequest();
  stateMembers = StateMembers;
  loadingTableSettings = new LoadingTableSettings();

  constructor(elementId: string) {
    super(elementId);
  }

  createMemberErrorMsg() {
    const printMemberError = document.createElement("div");
    printMemberError.id = "customErrorMessage";
    printMemberError.classList.add(
      "text-xs",
      "h-4",
      "text-red-500",
      "w-48",
      "md:absolute",
      "md:bottom-1",
      "md:left-0"
    );
    this.formEl?.append(printMemberError);
  }

  createToast() {
    const toastEl = document.createElement("div");
    toastEl.id = "toast";
    toastEl.classList.add(
      "fixed",
      "top-14",
      "p-1",
      "px-6",
      "text-white",
      "text-sm",
      "bg-black_opacity",
      "z-40"
    );
    toastEl.style.transform = "translateY(-100%)";
    this.formEl?.prepend(toastEl);
  }

  POSTOptions(e: SubmitEvent) {
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

  createNewMembers(fetchedData: any) {
    const { firstname, lastname, phone, id } = fetchedData;
    const newMember = { fullname: `${firstname} ${lastname}`, phone, id };
    return [...this.stateMembers.sortedMembers, newMember];
  }

  formValues(e: SubmitEvent) {
    const processFormValues = this.formKeys?.map(item => {
      return { [item]: getFormValues(e)[item] };
    });
    return processFormValues && Object.assign({}, ...processFormValues);
  }

  async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.formKeys = Object.keys(getFormValues(e));

    // Validations

    const errors = new ValidationGeneric(this.formKeys).errors;
    if (errors.length > 0) return;
    const isMember = new ValidationMember(
      this.stateMembers.sortedMembers,
      this.formValues(e)
    ).isMember;
    if (isMember.length > 0) return;

    // POST Member Request;

    this.loadingTableSettings.createLoadingContainer();
    const data = await Helpers.fetchData(this.POSTOptions(e));
    document.querySelector("table")?.remove();
    const newMembers = this.createNewMembers(data?.fetchedData);
    this.stateMembers.processMembers(newMembers);
    document.getElementById("noDataContainer")?.remove();
    new TableMembersPrinter();
    new AlertCreator("sectionTable", "tableMembers");
    this.loadingTableSettings.removeFormErrors();
    this.loadingTableSettings.removeLoadingContainer();
    new ToastPrinter("Zapisano");
  }

  submitEvent() {
    this.formEl?.addEventListener("submit", this.handleSubmit.bind(this));
  }
}
