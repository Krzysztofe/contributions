type ModelOptions = {
  url: string;
  method?: string;
  headers: any;
  body?: any;
};

export class HttpRequest {
  requestedData: [];
  isLoading: any;
  options: ModelOptions

  constructor(options:ModelOptions) {
    this.isLoading = null;
    this.requestedData = [];
    this.options = options
    this.sendRequest(options)
  }

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

  async sendRequest({ url, method = "GET", headers, body }: ModelOptions) {
    const requestOptions: RequestInit = {
      method,
      headers,
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

        let data;
        if (body?.login) {
          data = await resp.text();
        } else if (method === "DELETE") {
          data = body.id;
        } else {
          data = await resp.json();
        }

        return { isLoading: this.isLoading, fetchedData: data };
      }
    } catch (err: any) {
      this.#createErrorPage(err.message);
    }
  }
}
