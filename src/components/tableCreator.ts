export class TableCreator {
  parentEl: HTMLElement | null;
  tebleEl: HTMLTableElement | null = null;

  constructor(element: string) {
    this.parentEl = document.getElementById(element);
  }

  createTable(styles: string[] = []) {
    const tableEl = document.createElement("table");
    tableEl.classList.add("table", "table-xs", "bg-primary_dark",...styles);
    tableEl.id = "tableMembers";
    this.parentEl?.append(tableEl);
    this.tebleEl = tableEl;
  }

  createTableHead(headers: string[]) {
    // head
    const tableHeadEl = document.createElement("thead");
    tableHeadEl.classList.add("sticky", "top-0", "z-50");

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

      const colorTh =
        arr.length > 4 ? ["bg-accent", "text-white"] : ["bg-primary_dark"];

      th.classList.add(
        "font-normal",
        "p-0",
        "text-accent",
        ...colorTh,
        ...stickyTh
      );

      const internalDiv = document.createElement("div");

      const divStyles =
        ({
          0: ["border-l-0", "h-[24.4px]"],
          [arr.length - 1]: ["border-r-0", "h-[24.4px]"],
        }[idx] as string[]) ?? [];

      internalDiv.classList.add(
        "text-center",
        "border-x",
        "border-white",
        "py-1",
        "px-2",
        ...stickyTh,
        ...divStyles
      );
      internalDiv.textContent = header;
      th.append(internalDiv);
      tableRowEl.append(th);
    });
    this.tebleEl?.append(tableHeadEl);
  }

  createTableBody(cellsData: any, icons: string[] = []) {
    // tbody
    const tableBodyEl = document.createElement("tbody");
    tableBodyEl.classList.add("bg-white");

    cellsData.forEach((cellData: any, idx: number) => {
      // tr
      const tableRowEl = document.createElement("tr");
      const tableRowId = Math.random().toString();
      tableRowEl.id = tableRowId;
      const stylesTr = ["odd:bg-grey_light", "even:bg-white"];
      tableRowEl.classList.add(...stylesTr);
      tableBodyEl.append(tableRowEl);

      //   td
      const td = document.createElement("td");
      td.classList.add("border", "border-primary_dark");
      td.innerText = (idx + 1).toString();
      tableRowEl.append(td);

      Object.values(cellData).forEach((value: any, idx) => {
        const stylesTd = idx === 0 ? ["sticky", "left-0", "bg-inherit"] : [];
        const td = document.createElement("td");
        idx === 0 ? (td.id = value) : null;
        idx === 0 ? td.setAttribute("data", "member") : null;
        td.classList.add(
          "text-center",
          "whitespace-nowrap",
          "border",
          "border-primary_dark",
          ...stylesTd
        );
        td.innerText = value;
        tableRowEl.append(td);
      });

      // buttons container
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
          btnIcon.id = Math.random().toString();
          btnIcon.setAttribute("data-row-id", tableRowId);
          btnIcon.classList.add("fa", icon);
          btnsContainer.append(btnIcon);
        });
        tableRowEl.append(btnsContainer);
      }
    });
    this.tebleEl?.append(tableBodyEl);
  }
}
