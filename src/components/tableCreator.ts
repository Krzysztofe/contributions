export class TableCreator {
  parentEl: HTMLElement | null;
  tableEl: HTMLTableElement | null = null;
  td: NodeListOf<HTMLTableCellElement> | null = null;
  cellsData: { [key: string]: string }[] | null = null;

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
          0: ["bg-primary_dark"],
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
        "px-3",
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
    cellsData,
    icons = [],
    cellInnerHtml,
    stylesTd = () => [],
    styles = [],
    tdSetAtribut = null,
  }: {
    cellsData: { [key: string]: string }[];
    icons?: string[];
    cellInnerHtml: (value: string | { [key: string]: any }) => string;
    stylesTd?: (value?: any) => string[] | string[];
    styles?: string[];
    tdSetAtribut?: any;
  }) {
    this.cellsData = cellsData;

    // Tbody
    const tableBodyEl = document.createElement("tbody");
    tableBodyEl.classList.add("bg-white");

    cellsData.forEach((cellData, idx) => {
      // Tr
      const tableRowEl = document.createElement("tr");
      const tableRowId = Math.random().toString();
      tableRowEl.id = tableRowId;
      const stylesTr = ["odd:bg-grey_light", "even:bg-white"];

      tableRowEl.classList.add(...stylesTr);
      tableBodyEl.append(tableRowEl);

      //   td - first
      const td = document.createElement("td");
      td.classList.add("border", "border-primary_dark", "px-3");
      td.innerText = (idx + 1).toString();
      td.setAttribute("data", "idx");
      tableRowEl.append(td);

      // td - others

      const memberId = cellData.id;
      const printCells = { ...cellData };
      delete printCells.id;
      delete printCells.join_date;

      Object.values(printCells).forEach((value: string, idx) => {
     
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
        idx > 0 ? td.setAttribute("data", "memberDetails") : null;
        tdSetAtribut && tdSetAtribut({ tdElement: td, idx: idx, month: value });
        td.classList.add(
          "border",
          "border-primary_dark",
          "align-top",
          "py-2",
          ...stylesTdName,
          ...stylesTd(idx),
          ...styles
        );

        td.innerHTML = idx === 0 ? value : cellInnerHtml(value);
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
          btnIcon.classList.add("fa", icon);
          btnsContainer.append(btnIcon);
        });
        tableRowEl.append(btnsContainer);
      }
    });

    this.tableEl?.append(tableBodyEl);
  }
}
