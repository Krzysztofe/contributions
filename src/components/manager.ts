// import { HttpRequest } from "../../services/httpRequest";
// import { TableCreator } from "./tableCreator";
// import { AlertCreator } from "../alertCreator";
// import { URL_MEMBERS } from "../../data/dataUrl";

// class TableMembersManager {
//   #url: string;
//   #jwt: string | null;
//   #request: HttpRequest;

//   constructor() {
//     this.#url = URL_MEMBERS;
//     this.#jwt = localStorage.getItem("jwt");
//     this.#request = new HttpRequest();
//   }

//   fetchData(): Promise<any[]> {
//     const GETMembersOptions = {
//       url: this.#url,
//       headers: {
//         Authorization: `Bearer ${this.#jwt}`,
//       },
//     };

//     return this.#request
//       .sendRequest(GETMembersOptions)
//       .then((requestValues:any) => requestValues?.fetchedData);
//   }

//   protected processData(data: any[]): any[] {
//     return data.map(
//       ({
//         fullname,
//         phone,
//         id,
//       }: {
//         fullname: string;
//         phone: string;
//         id: string;
//       }) => {
//         return { id, fullname, phone };
//       }
//     );
//   }

//   protected createTableWithData(data: any[], containerId: string): void {
//     const settingsTable = new TableCreator(containerId);

//     if (!data || data.length === 0) {
//       settingsTable.noDataContainer();
//     } else {
//       settingsTable.createTable(["max-w-[1000px]"]);
//       settingsTable.createTableHead([
//         `${data.length}`,
//         "Imię i Nazwisko",
//         "Telefon",
//         "",
//       ]);
//       settingsTable.createTableBody(data, ["fa-trash"]);

//       new AlertCreator(containerId, "tableMembers");
//     }
//   }
// }

// export class PrintTableMembers extends TableMembersManager {
//   async performFunctionality(): Promise<void> {
//     const data = await this.fetchData();
//     const processedData = this.processData(data);
//     this.createTableWithData(processedData, "sectionTable");
//   }
// }

// export class UpdateTableMembers extends TableMembersManager {
//   async performFunctionality(): Promise<void> {
//     const data = await this.fetchData();
//     const processedData = this.processData(data);
//     const tableEl = document.querySelector("table");
//     tableEl?.remove();
//     this.createTableWithData(processedData, "sectionTable");
//   }
// }

{}