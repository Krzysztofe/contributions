import { HttpRequest } from "../services/httpRequest";
import { ModelRequestOptions } from "../sharedModels/modelRequestOptions";

export class Helpers {
  static fetchData(requestOptions: ModelRequestOptions) {
    const request = new HttpRequest();
    return request.sendRequest(requestOptions);
  }
  static capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static isUserLoged() {
    const userLoged = localStorage.getItem("jwt");
    !userLoged && (location.href = "/");
  }

  static getFormValues(e: SubmitEvent) {
    const elementId = (e.currentTarget as HTMLFormElement)?.id;
    const formEl = document.getElementById(elementId) as HTMLFormElement;
    const formData = formEl && new FormData(formEl);

    const formValues: { [key: string]: string } = {};

    if (formData) {
      for (const [key, value] of formData.entries()) {
        formValues[key] = (value as string).trim();
      }
    }

    return formValues;
  }
}
