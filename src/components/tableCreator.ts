export class TableCreator {
  parentEl: HTMLElement | null;
  tebleEl: HTMLTableElement | null = null;

  constructor(element: string) {
    this.parentEl = document.getElementById(element);
  }

  createTable() {
    const tableEl = document.createElement("table");
    tableEl.classList.add(
      "table",
      "table-xs",
      "table-pin-rows",
      "h-96",
      "bg-primary_dark",
      "p-0"
    );
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
    headers.forEach((header, idx) => {
      const th = document.createElement("th");
      th.textContent = header;
      const styles = idx === 2 ? ["sticky", "left-0", "bg-primary_dark"] : [];

      th.classList.add(...styles, "bg-primary_dark", "text-accent");
      tableRowEl.append(th);
    });
    this.tebleEl?.append(tableHeadEl);
  }

  createTableBody(members: any, icons: string[] = []) {
    // tbody
    const tableBodyEl = document.createElement("tbody");
    tableBodyEl.classList.add("bg-white");

    // tr
    members.forEach((member: any, idx: number) => {
      const tableRowEl = document.createElement("tr");
      tableBodyEl.append(tableRowEl);

      const td = document.createElement("td");
      td.innerText = (idx + 1).toString();
      tableRowEl.append(td);

      Object.values(member).forEach((value: any, idx) => {
        const styles = idx === 1 ? ["sticky", "left-0", "bg-white"] : [];

        const td = document.createElement("td");
        td.classList.add(...styles);
        td.innerText = value;
        tableRowEl.append(td);
      });

      icons.forEach(icon => {
        const td = document.createElement("td");
        const iconContainer = document.createElement("div");
        iconContainer.classList.add("fa", icon);
        td.append(iconContainer);
        tableRowEl.append(td);
      });
    });
    this.tebleEl?.append(tableBodyEl);
  }
}
