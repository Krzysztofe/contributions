import { FormCreator } from "./formCreator";
import { getFormValues } from "../../utils/getFormValues";
import { ValidationUniversal } from "../../utils/validationUniversal";
import { HttpRequest } from "../../services/httpRequest";
import { LoadingButtonCreator } from "../loadingsCreators/loadingButtonCreator";
import { ToastCreator } from "../toastCreator";
import { TableCreator } from "../tableCreator";
import { AlertCreator } from "../alertCreator";

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
    const loader = new LoadingButtonCreator("btnSubmit");
    loader.createSpinner();
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
        loader.removeSpinner();
        new ToastCreator("form");
      }
    });

    // GET Members Request

    const GETMembersOptions = {
      url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    request.sendRequest(GETMembersOptions).then(requestMembers => {

console.log("", requestMembers?.fetchedData);

      // const settingsTable = new TableCreator("sectionTable");
      // const dataInTable = requestMembers?.fetchedData.map(
      //   ({ fullname, phone, id }: any) => {
      //     return { fullname, phone, id };
      //   }
      // );

      // if (!dataInTable || dataInTable.length === 0) {
      //   settingsTable.noDataContainer();
      // } else {
      //   settingsTable.createTable(["max-w-[1000px]"]);
      //   settingsTable.createTableHead([
      //     `${dataInTable.length}`,
      //     "Imię i Nazwisko",
      //     "Telefon",
      //     "",
      //   ]);

      //   settingsTable.createTableBody(dataInTable, ["fa-trash"]);
      //   new AlertCreator("sectionTable", "tableMembers");
      // }

      // console.log("eee", requestValues?.fetchedData);
    });

    //  this.formEl?.reset();
  }

  submitEvent(url: string) {
    this.formEl?.addEventListener("submit", e => this.handleSubmit(e, url));
  }
}
