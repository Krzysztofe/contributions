export class HttpRequest {
  requestedData: [];
  isLoading: any;

  constructor() {
    this.isLoading = null;
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
      "h-screen",
      "bg-white_opacity",
      "text-red-500",
      "fixed",
      "top-0",
      "left-0",
      "right-0",
      "z-50"
    );

    body?.prepend(errorContainer);
  };

  async sendRequest(
    url: string,
    method: string = "GET",
    headers: any,
    body: any = null
  ) {
    const requestOptions: RequestInit = {
      method,
      headers,
      body: JSON.stringify(body),
    };

    if (method !== "GET" && method !== "HEAD") {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const resp = await fetch(url, requestOptions);
      if (!resp.ok) {
        throw Error("Błąd. Ponów próbę");
      } else {
        this.isLoading = false;
        const data = await resp.text();
        return { isLoading: this.isLoading, fetchedData: data };
      }
    } catch (err: any) {
      this.#createErrorPage(err.message);
    }
  }
}
