import { URL_MEMBERS } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { getFormValues } from "../../utils/getFormValues";
import { ValidationUniversal } from "../../utils/validationUniversal";
import { LoadingTableCreator } from "../loadingsCreators/loadingTableCreator";
import { TableMembersManager } from "../../pages/settings/tableMembersManager";
import { ToastCreator } from "../toastCreator";
import { FormCreator } from "./formCreator";
import { capitalize } from "../../utils/capitalize";
import { ValidationMember } from "../../pages/settings/validationMember";

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

    // Validations
    const formKeys = Object.keys(getFormValues(e));
    this.printLoginError && (this.printLoginError.innerText = "");
    const errors = new ValidationUniversal(formKeys).errors;
    if (errors.length > 0) return;
    const isMember = new ValidationMember(members, getFormValues(e)).isMember;
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
      console.log("", returnedValues?.fetchedData);

      // GETMembers

      const GETMembersOptions = {
        url: URL_MEMBERS,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };

      request.sendRequest(GETMembersOptions).then(requestMembers => {
        document.getElementById("noDataContainer")?.remove();
        new TableMembersManager(requestMembers?.fetchedData);
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
