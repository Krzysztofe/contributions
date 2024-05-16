import { AlertCreator } from "../../../components/alertCreator";
import { FormCreator } from "../../../components/formsCreators/formCreator";
import { StateMembers } from "../../../components/stateMembers";
import { ToastPrinter } from "../../../components/toastPrinter";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { HttpRequest } from "../../../services/httpRequest";
import { capitalize } from "../../../utils/capitalize";
import { ValidationUniversal } from "../../../utils/validationUniversal";
import { LoadingTableSettings } from "../loadingTableSettings";
import { TableMembersPrinter } from "../tableMembersPrinter";
import { ValidationMember } from "../validationMember";
import { getFormValues } from "./../../../utils/getFormValues";

export class FormCreateMember extends FormCreator {
  printLoginError: HTMLElement | null = null;

  constructor(ElementId: string) {
    super(ElementId);
  }

  createMemberErrorMsg() {
    this.printLoginError = document.createElement("div");
    this.printLoginError.id = "customErrorMessage";
    this.printLoginError.classList.add(
      "text-xs",
      "h-4",
      "text-red-500",
      "w-48",
      "md:absolute",
      "md:bottom-1",
      "md:left-0"
    );
    this.formEl?.append(this.printLoginError);
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

  fetchData(e: SubmitEvent) {
    const POSTMemberOptions = {
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
    const request = new HttpRequest();
    return request.sendRequest(POSTMemberOptions);
  }

  async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const members = StateMembers.sortedMembers;

    // Validations
    const processFormValues = ["firstname", "lastname", "phone"].map(item => {
      return {[item]: getFormValues(e)[item]};
    });
    const formValues = Object.assign({}, ...processFormValues);
    const formKeys = Object.keys(getFormValues(e));

    const errors = new ValidationUniversal(formKeys).errors;
    if (errors.length > 0) return;
    const isMember = new ValidationMember(members, formValues).isMember;
    if (isMember.length > 0) return;

    // POST Member Request;

    LoadingTableSettings.createLoadingContainer();

    const data = await this.fetchData(e);
    document.querySelector("table")?.remove();
    const { firstname, lastname, phone, id } = data?.fetchedData;

    const newMember = { fullname: `${firstname} ${lastname}`, phone, id };
    const newMembers = [...StateMembers.sortedMembers, newMember];
    StateMembers.setMembers(newMembers);
    document.getElementById("noDataContainer")?.remove();
    new TableMembersPrinter();
    new AlertCreator("sectionTable", "tableMembers");
    LoadingTableSettings.removeFormErrors();
    LoadingTableSettings.removeLoadingContainer();
    new ToastPrinter("Zapisano");
  }

  submitEvent() {
    this.formEl?.addEventListener("submit", this.handleSubmit.bind(this));
  }
}