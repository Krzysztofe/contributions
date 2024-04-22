export class TableCreator {
  parentEl: HTMLElement | null;
  tebleEl: HTMLTableElement | null = null;

  constructor(element: string) {
    this.parentEl = document.getElementById(element);
  }

  createTable(styles: string[] = []) {
    const tableEl = document.createElement("table");
    tableEl.classList.add(
      "table",
      "bg-primary_dark",
      "md:text-base",
      ...styles
    );
    tableEl.id = "tableMembers";
    this.parentEl?.append(tableEl);
    this.tebleEl = tableEl;
  }

  createTableHead(headers: string[]) {
    // head
    const tableHeadEl = document.createElement("thead");
    tableHeadEl.classList.add("sticky", "top-0", "z-50", "md:text-base");

    // tr
    const tableRowEl = document.createElement("tr");
    tableHeadEl.append(tableRowEl);

    // th
    headers.forEach((header, idx) => {
      const th = document.createElement("th");
      th.textContent = header;
      const stylesTh = idx === 1 ? ["sticky", "left-0", "bg-primary_dark"] : [];

      th.classList.add(...stylesTh, "bg-primary_dark", "text-accent");
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
      td.innerText = (idx + 1).toString();
      tableRowEl.append(td);

      Object.values(cellData).forEach((value: any, idx) => {
        const stylesTd = idx === 0 ? ["sticky", "left-0", "bg-inherit"] : [];
        const td = document.createElement("td");
        idx === 0 ? (td.id = value) : null;
        idx === 0 ? td.setAttribute("data", "member") : null;
        td.classList.add("whitespace-nowrap", ...stylesTd);
        td.innerText = value;
        tableRowEl.append(td);
      });

      // buttons container
      if (icons.length > 0) {
        const btnsContainer = document.createElement("td");
        btnsContainer.classList.add("min-w-24", "flex", "justify-end");
        icons.forEach(icon => {
          const btnIcon = document.createElement("button");
          btnIcon.id = Math.random().toString();
          btnIcon.setAttribute("data-row-id", tableRowId);
          btnIcon.classList.add("fa", icon, "last:ml-8");
          btnsContainer.append(btnIcon);
        });
        tableRowEl.append(btnsContainer);
      }
    });
    this.tebleEl?.append(tableBodyEl);
  }
}
