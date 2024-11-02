import { ModelRequestOptions } from "../sharedModels/modelRequestOptions";

export class HttpRequest {
  #createErrorPage = () => {
    const body = document.querySelector("body");
    if (!body) return;
    const errorContainer = document.createElement("div");
    errorContainer.innerText = "Błąd. Ponów próbę";
    errorContainer.classList.add(
      "grid",
      "place-content-center",
      "h-screen",
      "bg-white_opacity",
      "text-danger",
      "fixed",
      "top-0",
      "left-0",
      "right-0"
    );
    errorContainer.style.zIndex = "60";
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

    console.log("www", requestOptions);

    try {
      const resp = await fetch(url, requestOptions);

      console.log("", resp);
      if (!resp.ok) {
        throw Error("Błąd. Ponów próbę");
      } else {
        console.log("eeeee");
        let data;
        if (body?.login !== undefined && body?.login !== "") {
          data = await resp.text();
        } else if (method === "DELETE") {
          data = body?.id;
        } else {
          data = await resp.json();
        }
        return data;
      }
    } catch (err: any) {
      console.log("eror");

      this.#createErrorPage();
    }
  }
}
