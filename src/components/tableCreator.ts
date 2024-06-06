import { ModelObjectAny } from "../sharedModels/modelObjectAny";
import { ModelObjectString } from "../sharedModels/modelObjectString";

type ModelTableBody = {
  tdDataList: ModelObjectAny[];
  icons?: string[];
  tdInnerHtml: (value: string | ModelObjectString) => string;
  stylesTd?: (idx?: number) => string[] | string[];
  styles?: string[];
  tdSetAtribut?: (params: {
    tdEl: HTMLElement;
    idx: number;
    databaseValue: ModelObjectAny[];
  }) => void | any[];
};

export class TableCreator {
  parentEl: HTMLElement | null;
  tableEl: HTMLTableElement | null = null;
  td: NodeListOf<HTMLTableCellElement> | null = null;
  cellsData: ModelObjectString[] | null = null;

  constructor(parentEl: string) {
    this.parentEl = document.getElementById(parentEl);
  }

  noDataContainer() {
    const containerEl = document.createElement("div");
    containerEl.innerText = "Brak danych";
    containerEl.id = "noDataContainer";
    containerEl.classList.add("text-center", "text-red-500", "h-10");

    this.parentEl?.append(containerEl);
  }

  createTable(styles: string[] = []) {
    const tableEl = document.createElement("table");
    tableEl.classList.add(
      "table",
      "table-xs",
      "bg-primary_dark",
      "relative",
      "rounded-sm",
      ...styles
    );
    tableEl.id = "tableMembers";
    this.parentEl?.append(tableEl);
    this.tableEl = tableEl;
  }

  createTableHead({
    headers,
    stylesTh = [],
  }: {
    headers: string[];
    stylesTh?: string[];
  }) {
    // head
    const tableHeadEl = document.createElement("thead");
    tableHeadEl.classList.add("sticky", "top-0", "z-30");

    // tr
    const tableRowEl = document.createElement("tr");
    tableHeadEl.append(tableRowEl);

    // th
    headers.forEach((header, idx, arr) => {
      const th = document.createElement("th");

      const stickyTh =
        ({
          0: ["bg-primary_dark", "text-accent"],
          1: ["bg-primary_dark", "sticky", "left-0", "text-accent"],
        }[idx] as string[]) ?? [];

      th.classList.add(
        "font-normal",
        "p-0",
        "text-accent",
        ...stickyTh,
        ...stylesTh
      );

      tableRowEl.append(th);

      const internalDiv = document.createElement("div");
      internalDiv.setAttribute("data", "internalDiv");

      const divStyles =
        ({
          0: ["border-l-0", "h-[24.4px]"],
          [arr.length - 1]: ["border-r-0", "h-[24.4px]"],
        }[idx] as string[]) ?? [];

      internalDiv.classList.add(
        "border-x",
        "border-white",
        "h-[24.4px]",
        "flex",
        "items-center",
        "px-2",
        ...stickyTh,
        ...divStyles
      );
      internalDiv.textContent = header;
      th.append(internalDiv);
      tableRowEl.append(th);
    });

    this.tableEl?.append(tableHeadEl);
  }

  createTableBody({
    tdDataList,
    icons = [],
    tdInnerHtml,
    stylesTd = () => [],
    styles = [],
    tdSetAtribut,
  }: ModelTableBody) {
    this.cellsData = tdDataList;

    // Tbody
    const tableBodyEl = document.createElement("tbody");
    tableBodyEl.classList.add("bg-white");

    tdDataList.forEach((tdData, idx) => {
      // Tr
      const tableRowEl = document.createElement("tr");
      const tableRowId = Math.random().toString();
      tableRowEl.id = tableRowId;
      const stylesTr = ["odd:bg-grey_light", "even:bg-white"];

      tableRowEl.classList.add(...stylesTr);
      tableBodyEl.append(tableRowEl);

      //   td - first
      const td = document.createElement("td");
      td.classList.add("border", "border-primary_dark", "p-2", "align-top");
      td.innerText = (idx + 1).toString();
      td.setAttribute("data", "idx");
      tableRowEl.append(td);

      // td - others

      const memberId = tdData.id;
      const printCells = { ...tdData };
      delete printCells.id;

      Object.values(printCells).forEach((value, idx) => {
        const stylesTdName =
          idx === 0
            ? [
                "sticky",
                "left-0",
                "bg-inherit",
                "after:content-['']",
                "after:absolute",
                "after:top-0",
                "after:left-[100%]",
                "after:w-[1px]",
                "after:h-full",
                "after:bg-primary_dark",
                "before:content-['']",
                "before:absolute",
                "before:top-0",
                "before:right-[100%]",
                "before:w-[1px]",
                "before:h-full",
                "before:bg-primary_dark",
                "cursor-pointer",
              ]
            : [];

        const td = document.createElement("td");
        idx === 0 ? (td.id = value) : null;
        idx === 0 ? td.setAttribute("data", "member") : null;
        tdSetAtribut && tdSetAtribut({ tdEl: td, idx, databaseValue: value });

        td.classList.add(
          "border",
          "border-primary_dark",
          "align-top",
          "py-2",
          ...stylesTdName,
          ...stylesTd(idx),
          ...styles
        );

        td.innerHTML = idx === 0 ? value : tdInnerHtml(value);

        tableRowEl.append(td);
      });

      // Buttons container

      if (icons.length > 0) {
        const btnsContainer = document.createElement("td");
        btnsContainer.classList.add(
          "min-w-24",
          "text-center",
          "border",
          "border-primary_dark"
        );
        icons.forEach(icon => {
          const btnIcon = document.createElement("button");
          btnIcon.id = memberId;
          btnIcon.setAttribute("data-row-id", tableRowId);
          btnIcon.classList.add("fa", icon, "text-dark");
          btnsContainer.append(btnIcon);
        });
        tableRowEl.append(btnsContainer);
      }
    });

    this.tableEl?.append(tableBodyEl);
  }
}
