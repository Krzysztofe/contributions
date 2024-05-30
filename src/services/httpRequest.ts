import { ModelRequestOptions } from "../sharedModels/modelRequestOptions";

export class HttpRequest {
  #createErrorPage = (err: string) => {
    const body = document.querySelector("body");
    if (!body) return;
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

  async sendRequest({
    url,
    method = "GET",
    headers,
    body,
  }: ModelRequestOptions) {
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
        let data;
        if (body?.login) {
          data = await resp.text();
        } else if (method === "DELETE") {
          data = body?.id;
        } else {
          data = await resp.json();
        }
        return data;
      }
    } catch (err: any) {
      this.#createErrorPage(err.message);
    }
  }
}
