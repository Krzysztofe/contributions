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
}
