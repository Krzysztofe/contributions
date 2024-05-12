import { HttpRequest } from "../../services/httpRequest";
import { getFormValues } from "../../utils/getFormValues";
import { ValidationUniversal } from "../../utils/validationUniversal";
import { LoadingButtonCreator } from "../loadingsCreators/loadingButtonCreator";
import { ToastCreator } from "../toastCreator";
import { FormCreator } from "./formCreator";
import { URL_MEMBERS } from "../../data/dataUrl";
import { TableMembersManager } from "../table/tableMembersManager";
import { LoadingX } from "../loadingsCreators/loadingX";
import { LoadingTableCreator } from "../loadingsCreators/loadingTableCreator";

export class FormCreateMember extends FormCreator {
  constructor(ElementId: string) {
    super(ElementId);
  }

  handleSubmit(e: SubmitEvent, url: string) {
    e.preventDefault();

    // Validation
    const elements = Object.keys(getFormValues(e));
    const uni = new ValidationUniversal(elements);
    uni.validation();
    if (uni.errors.length > 0) return;

    // POST Member Request;

    const request = new HttpRequest();
    const loader = new LoadingTableCreator("body");
    loader.createLoadigContainer();

    // const loader = new LoadingButtonCreator("btnSubmit");
    // loader.createSpinner();
    // const newLoad = new LoadingX("#sectionTable");
    // newLoad.createLoadigContainer();

    const POSTMemberOptions = {
      url,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        firstname: getFormValues(e).firstname,
        lastname: getFormValues(e).lastname,
        phone: getFormValues(e).phone,
      },
    };

    request.sendRequest(POSTMemberOptions).then(requestValues => {
      if (requestValues?.isLoading === false) {
        // loader.removeSpinner();
        document.querySelector("table")?.remove();
        new ToastCreator("form");
      }

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
        loader.removeLoadingContainer();
      });
    });
  }

  submitEvent(url: string) {
    this.formEl?.addEventListener("submit", e => this.handleSubmit(e, url));
  }
}
