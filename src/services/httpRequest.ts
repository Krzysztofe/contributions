// // import { LoadigPageCreator } from "../components/loadingPageCreator";

// // import { LoadingButtonCreator } from "../components/loadings/loadingButtonCreator";

// // export class HttpRequest {
// //   requestedData: [];
// //   isLoading: boolean;
// //   constructor(url: string, method: string = "GET", data: any = null) {
// //     this.isLoading = false;
// //     this.sendRequest(url, method, data);
// //     this.requestedData = [];
// //   }

// //   transformData = (data: any) => {
// //     console.log("", data);
// //   };

// //   #createErrorPage = (err: string) => {
// //     const body = document.querySelector("body");
// //     const errorContainer = document.createElement("div");
// //     errorContainer.innerText = err;
// //     errorContainer.classList.add(
// //       "grid",
// //       "place-content-center",
// //       "h-full",
// //       "bg-white",
// //       "text-red-500",
// //       "fixed",
// //       "top-0",
// //       "left-0",
// //       "right-0",
// //       "z-50"
// //     );

// //     body?.prepend(errorContainer);
// //   };

// //   async sendRequest(url: string, method: string = "GET", data: any = null) {
// //     const requestOptions: RequestInit = {
// //       method: method,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     };

// //     if (method !== "GET" && method !== "HEAD") {
// //       requestOptions.body = JSON.stringify(data);
// //     }

// //     const spinner = new LoadingButtonCreator().spinner;

// //     try {
// //       this.isLoading = true;

// //       const btn = document.getElementById("btnSubmit") as HTMLButtonElement;
// //       // btn.innerText = "";
// //       // btn.append(spinner);
// //       // btn.disabled = true;

// //       const resp = await fetch(url, requestOptions);

// //       // const resp = await fetch(
// //       //   "http://kkrol.host83.nstrefa.pl/authenticate.php",
// //       //   {
// //       //     method: "post",
// //       //     headers: {
// //       //       Accept: "application/json",
// //       //       "Content-Type": "application/json",
// //       //     },

// //       //     body: JSON.stringify({
// //       //       login: "januszjanuszex",
// //       //       password: "janush123",
// //       //     }),
// //       //   }
// //       // );

// //       if (!resp.ok) {
// //         throw Error("Błąd. Ponów próbę");
// //       } else {
// //         this.isLoading = false;
// //         const data = await resp.json();
// //         spinner.remove();
// //         // btn.disabled = false;
// //         // btn.innerText = "Zaloguj się";
// //         console.log('',data)
// //         return data;
// //       }
// //     } catch (err: any) {
// //       this.#createErrorPage(err.message);
// //       console.log("", err);
// //     }
// //   }
// // }

// // import { LoadigPageCreator } from "../components/loadingPageCreator";

// // import { LoadingButtonCreator } from "../components/loadings/loadingButtonCreator";

// // export class HttpRequest {
// //   requestedData: [];
// //   isLoading: boolean;
// //   constructor(url: string, method: string = "GET", data: any = null) {
// //     this.isLoading = false;
// //     this.sendRequest(url, method, data);
// //     this.requestedData = [];
// //   }

// //   transformData = (data: any) => {
// //     console.log("", data);
// //   };

// //   async sendRequest(url: string, method: string = "GET", data: any = null) {
// //     const requestOptions: RequestInit = {
// //       method: method,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     };

// //     if (method !== "GET" && method !== "HEAD") {
// //       requestOptions.body = JSON.stringify(data);
// //     }

// //     const spinner = new LoadingButtonCreator().spinner;

// //     try {
// //       this.isLoading = true;

// //       const resp = await fetch(url, requestOptions);

// //       if (!resp.ok) {
// //         throw Error("Błąd. Ponów próbę");
// //       } else {
// //         const data = await resp.json();
// //         spinner.remove();
// //         return data;
// //       }
// //     } catch (err: any) {
// //       console.log("", err);
// //     } finally {
// //       this.isLoading = false;
// //     }
// //   }
// // }

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
        this.isLoading = false;

        return { isLoading: this.isLoading, fetchedData: data };
      }
    } catch (err: any) {
      this.#createErrorPage(err);
    }
  }
}
