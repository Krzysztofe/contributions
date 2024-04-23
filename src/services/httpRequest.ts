import { LoadigPageCreator } from "../components/loadingPageCreator";

export class HttpRequest {
  requestedData: []
  constructor(url: string, method: string = "GET", data: any = null) {
    new LoadigPageCreator();
    this.sendRequest(url, method, data);
    this.requestedData = [];
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

  async sendRequest(url: string, method: string = "GET", data: any = null) {
    const requestOptions: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET" && method !== "HEAD") {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const resp = await fetch(url, requestOptions);

      if (!resp.ok) {
        throw Error("Błąd. Ponów próbę");
      } else {
        const data = await resp.json();
        // this.requestedData.push(data);
        // console.log("", data);
        return data;
      }
    } catch (err: any) {
      this.#createErrorPage(err.message);
      console.log("", err);
    }
  }
}
