import { URL_MEMBERS } from "../../data/dataUrl";
import { HttpRequest } from "../../services/httpRequest";
import { getFormValues } from "../../utils/getFormValues";
import { ValidationUniversal } from "../../utils/validationUniversal";
import { LoadingTableCreator } from "../loadingsCreators/loadingTableCreator";
import { TableMembersManager } from "../../pages/settings/tableMembersManager";
import { ToastCreator } from "../toastCreator";
import { FormCreator } from "./formCreator";
import { capitalize } from "../../utils/capitalize";
import { sortedMembers } from "../../utils/sortedMembers";
import { ValidationMember } from "../../pages/settings/validationMember";

export class FormCreateMember extends FormCreator {
  constructor(ElementId: string) {
    super(ElementId);
  }

  handleSubmit(e: SubmitEvent, url: string, members: any) {
    e.preventDefault();
    // sortedMembers(members)

    // console.log("", sortedMembers(members));

    // console.log("", members);

    // Validation
    const formKeys = Object.keys(getFormValues(e));
    const basicVaidation = new ValidationUniversal(formKeys);
    basicVaidation.validation();
    new ValidationMember(sortedMembers(members), getFormValues(e));
    if (basicVaidation.errors.length > 0) return;
    // new ValidationMember(sortedMembers(members));
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
