import { URL_MEMBERS } from "../../../data/dataUrl";
import { HttpRequest } from "../../../services/httpRequest";
import { getFormValues } from "../../../utils/getFormValues";
import { ValidationUniversal } from "../../../utils/validationUniversal";
import { TableMembersPrinter } from "../table/tableMembersPrinter";
import { ToastCreator } from "../../../components/toastCreator";
import { FormCreator } from "../../../components/formsCreators/formCreator";
import { capitalize } from "../../../utils/capitalize";
import { ValidationMember } from "../validationMember";
import { StateMembers } from "../../../components/stateMembers";
import { LoadingTableSettings } from "../loadingTableSettings";
import { AlertCreator } from "../../../components/alertCreator";

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

  fetchData(e: SubmitEvent) {
    const request = new HttpRequest();

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
    return request.sendRequest(POSTMemberOptions);
  }

  async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const members = StateMembers.sortedMembers;

    // Validations

    const formKeys = Object.keys(getFormValues(e));
    const errors = new ValidationUniversal(formKeys).errors;
    if (errors.length > 0) return;
    const isMember = new ValidationMember(members, getFormValues(e)).isMember;
    if (isMember.length > 0) return;

    // POST Member Request;

    LoadingTableSettings.createLoadingContainer();

    const data = await this.fetchData(e);
    document.querySelector("table")?.remove();
    const { firstname, lastname, phone, id } = data?.fetchedData;

    const newMember = { fullname: `${firstname} ${lastname}`, phone, id };

    if (StateMembers.sortedMembers === null) {
      StateMembers.sortedMembers = [];
    }
    const newMembers = [...StateMembers.sortedMembers, newMember];
    StateMembers.setMembers(newMembers);
    document.getElementById("noDataContainer")?.remove();
    new TableMembersPrinter();
    new AlertCreator("sectionTable", "tableMembers");
    LoadingTableSettings.removeFormErrors();
    LoadingTableSettings.removeLoadingContainer();
    new ToastCreator("form", "Zapisano");
  }

  submitEvent() {
    this.formEl?.addEventListener("submit", this.handleSubmit.bind(this));
  }
}
