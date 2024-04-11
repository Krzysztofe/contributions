import { LoadigPageCreator } from "../components/loadingPageCreator";

export class HttpRequest {
  constructor(url: string, method: string = "GET", data: any = null) {
    new LoadigPageCreator();
    this.#responseData(url, method, data);
  }

  transformData = (data: any) => {
    console.log("", data);
  };

  #createErrorPage = (err: string) => {
    const body = document.querySelector("body");
    const errorContainer = document.createElement("div");
    errorContainer.innerText = err;
    errorContainer.classList.add(
      "grid",
      "place-content-center",
      "h-full",
      "bg-white",
      "text-red-500",
      "fixed",
      "top-0",
      "left-0",
      "right-0",
      "z-50"
    );

    body?.prepend(errorContainer);
  };

  #sendRequest(url: string, method: string = "GET", data: any = null) {
    const requestOptions: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET" && method !== "HEAD") {
      requestOptions.body = JSON.stringify(data);
    }
    return fetch(url, requestOptions).then(resp => {
      if (!resp.ok) {
        return resp.json().then(() => {
          const error = new Error("Brak danych");

          throw error;
        });
      }
      return resp.json();
    });
  }

  #responseData = async (
    url: string,
    method: string = "GET",
    data: any = null
  ) => {
    try {
      const responseData = await this.#sendRequest(url, method, data);
      this.transformData(responseData);
    } catch (err: any) {
      this.#createErrorPage(err);
      console.log("error", `${err.message}`);
    }
  };
}
