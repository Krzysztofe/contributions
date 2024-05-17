import { AlertCreator } from "../../../components/alertCreator";
import { FormCreator } from "../../../components/formsCreators/formCreator";
import { ToastPrinter } from "../../../components/toastPrinter";
import { URL_MEMBERS } from "../../../data/dataUrl";
import { capitalize } from "../../../utils/capitalize";
import { ValidationGeneric } from "../../../utils/validationGeneric";
import { TableMembersPrinter } from "../tableMembersPrinter";
import { ValidationMember } from "../validationMember";
import { getFormValues } from "./../../../utils/getFormValues";

type ModelRequestOptions = {
  url: string;
  method?: string;
  headers: { [key: string]: string };
  body?: { [key: string]: string | null };
};

type ModelHttpRequest = {
  sendRequest(options: ModelRequestOptions): Promise<any>;
};



export class FormCreateMember extends FormCreator {
  request;
  stateMembers;
  loadingTableSettings;
  constructor(
    elementId: string,
    httpRequest: ModelHttpRequest,
    stateMembers: any,
    loadingTableSettings: any
  ) {
    super(elementId);
    this.request = httpRequest;
    this.stateMembers = stateMembers;
    this.loadingTableSettings = loadingTableSettings;
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
    return this.request.sendRequest(POSTMemberOptions);
  }

  createNewMembers(fetchedData: any) {
    const { firstname, lastname, phone, id } = fetchedData;
    const newMember = { fullname: `${firstname} ${lastname}`, phone, id };
    return [...this.stateMembers.sortedMembers, newMember];
  }

  async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.stateMembers.sortedMembers;

    // Validations
    const processFormValues = ["firstname", "lastname", "phone"].map(item => {
      return { [item]: getFormValues(e)[item] };
    });
    const formValues = Object.assign({}, ...processFormValues);
    const formKeys = Object.keys(getFormValues(e));

    const errors = new ValidationGeneric(formKeys).errors;
    // console.log('',errors)
    if (errors.length > 0) return;
    const isMember = new ValidationMember(
      this.stateMembers.sortedMembers,
      formValues
    ).isMember;
    if (isMember.length > 0) return;

    // POST Member Request;

    this.loadingTableSettings.createLoadingContainer();
    const data = await this.fetchData(e);
    document.querySelector("table")?.remove();
    const newMembers = this.createNewMembers(data?.fetchedData);
    // console.log("", newMembers);
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
