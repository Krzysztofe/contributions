import { URL_MEMBERS } from "../../../data/dataUrl";
import { HttpRequest } from "../../../services/httpRequest";
import { getFormValues } from "../../../utils/getFormValues";
import { ValidationUniversal } from "../../../utils/validationUniversal";
import { LoadingTableCreator } from "../../../components/loadingsCreators/loadingTableCreator";
import { TableMembersPrinter } from "../table/tableMembersPrinter";
import { ToastCreator } from "../../../components/toastCreator";
import { FormCreator } from "../../../components/formsCreators/formCreator";
import { capitalize } from "../../../utils/capitalize";
import { ValidationMember } from "../validationMember";
import { sortedMembers } from "../../../utils/sortedMembers";
import { StateMembers } from "../../../components/stateMembers";

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

  handleSubmit(e: SubmitEvent, url: string, members: any) {
    e.preventDefault();
    // console.log("", members);

    const toPrint = StateMembers.sortedMembers;
    console.log("uuu", toPrint);

    // Validations
    const formKeys = Object.keys(getFormValues(e));
    this.printLoginError && (this.printLoginError.innerText = "");
    const errors = new ValidationUniversal(formKeys).errors;
    if (errors.length > 0) return;
    const isMember = new ValidationMember(toPrint, getFormValues(e)).isMember;
    if (isMember.length > 0) return;

    // POST Member Request;

    const request = new HttpRequest();
    LoadingTableCreator.createLoadingContainer("body");

    const POSTMemberOptions = {
      url,
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

    request.sendRequest(POSTMemberOptions).then(returnedValues => {
      document.querySelector("table")?.remove();
      

      const GETMembersOptions = {
        url: URL_MEMBERS,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      request.sendRequest(GETMembersOptions).then(requestMembers => {
        document.getElementById("noDataContainer")?.remove();
        let membersToPrint = sortedMembers(requestMembers?.fetchedData);
        StateMembers.setMembers(requestMembers?.fetchedData);

        new TableMembersPrinter(membersToPrint);

        LoadingTableCreator.removeLoadingContainer();
        new ToastCreator("form");
      });
    });
  }

  submitEvent(url: string, members: any) {
    this.formEl?.addEventListener("submit", e =>
      this.handleSubmit(e, url, members)
    );
  }
}
