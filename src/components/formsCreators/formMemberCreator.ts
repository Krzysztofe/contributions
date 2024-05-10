import { FormCreator } from "./formCreator";
import { getFormValues } from "../../utils/getFormValues";
import { ValidationUniversal } from "../../utils/validationUniversal";
import { HttpRequest } from "../../services/httpRequest";
import { LoadingButtonCreator } from "../loadingsCreators/loadingButtonCreator";
import { ToastCreator } from "../toastCreator";


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
    console.log("", getFormValues(e));

    // Request;

    const request = new HttpRequest();
    const loader = new LoadingButtonCreator("btnSubmit");
    // loader.createSpinner();
    const requestOptions = {
      url,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        firstname: getFormValues(e).name,
        lastname: getFormValues(e).surname,
        phone: getFormValues(e).phone,
        join_date: "2007-09-98",
      },
    };

    request.sendRequest(requestOptions).then(requestValues => {
      if (requestValues?.isLoading === false) {
        loader.removeSpinner();
        new ToastCreator("form");
      }
    });

    const uu = {
      url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    request.sendRequest(uu).then(requestValues => {
      // console.log("eee", requestValues?.fetchedData);
    });

    //  this.formEl?.reset();
  }

  submitEvent(url: string) {
    this.formEl?.addEventListener("submit", e => this.handleSubmit(e, url));
  }
}
