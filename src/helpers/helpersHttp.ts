import { HttpRequest } from "../services/httpRequest";
import { TypeRequestOptions } from "../sharedTypes/typeRequestOptions"; 

export class HelpersHttp {
    static fetchData(requestOptions: TypeRequestOptions) {
        const request = new HttpRequest();
        return request.sendRequest(requestOptions);
      }
  }