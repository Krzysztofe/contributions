import { TypeObjectAny } from "../../sharedTypes/typeObjectAny";
import { TypeObjectString } from "../../sharedTypes/typeObjectString";

type TypeTableHaed = {
  headers: string[];
  stylesTh?: string[];
};

type TypeTableBody = {
  tdDataList: TypeObjectAny[];
  icons?: string[];
  tdInnerHtml: (value: string | TypeObjectString) => string;
  tdStylesCustom?: (idx?: number) => string[];
  tdStyles?: string[];
  tdSetAtribut?: (params: {
    tdEl: HTMLElement;
    idx: number;
    databaseValue: TypeObjectAny | string;
  }) => void | any[];
};

class TableHeadView {
  #tableEl = document.querySelector("table");
  #tableHeadEl = document.createElement("thead");
  #tableRowEl = document.createElement("tr");
  #headersData: string[] | null = null;
  #stylesTh: string[] | [] = [];

  constructor(headers: string[], stylesTh: string[] = []) {
    this.#headersData = headers;
    this.#stylesTh = stylesTh;
    this.#createTableHead();
  }

  #createTableHead() {
    this.#tableHeadEl.classList.add("sticky", "top-0", "z-30");
    this.#tableHeadEl.append(this.#tableRowEl);

    this.#headersData?.forEach((header, idx, arr) => {
      const th = document.createElement("th");

      const stickyTh =
        ({
          0: ["bg-primary_dark", "text-accent"],
          1: ["bg-primary_dark", "sticky", "left-0", "text-accent", "min-w-24"],
        }[idx] as string[]) ?? [];

      th.classList.add("p-0", "text-accent", ...stickyTh, ...this.#stylesTh);

      this.#tableRowEl.append(th);

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
      this.#tableRowEl.append(th);
    });

    this.#tableEl?.append(this.#tableHeadEl);
  }
}

class TableBodyView {
  #tableEl = document.querySelector("table");
  #tableBodyEl = document.createElement("tbody");
  #memberId: string | null = null;
  #trEl: HTMLElement | null = null;

  constructor({
    tdDataList,
    icons = [],
    tdInnerHtml,
    tdStylesCustom = () => [],
    tdStyles = [],
    tdSetAtribut,
  }: TypeTableBody) {
    this.#createTableBody({
      tdDataList,
      icons,
      tdInnerHtml,
      tdStylesCustom,
      tdStyles,
      tdSetAtribut,
    });
  }

  #createTr(tableRowId: string) {
    this.#trEl = document.createElement("tr");
    this.#trEl.id = tableRowId;
    const stylesTr = ["odd:bg-grey_light", "even:bg-white"];
    this.#trEl.classList.add(...stylesTr);
    this.#tableBodyEl?.append(this.#trEl);
  }

  #createTdFirst(idx: number) {
    const td = document.createElement("td");
    td.classList.add("border", "border-primary_dark", "p-2", "align-top");
    td.innerText = (idx + 1).toString();
    td.setAttribute("data", "idx");
    this.#trEl?.append(td);
  }

  #createtTdElems(
    tdData: TypeObjectAny,
    tdStylesCustom: (idx?: number) => string[] = () => [],
    styles: string[] = [],
    tdInnerHtml: (value: string | TypeObjectString) => string,
    tdSetAtribut?: (params: {
      tdEl: HTMLElement;
      idx: number;
      databaseValue: TypeObjectAny | string;
    }) => void
  ) {
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
              "z-20",
            ]
          : [];

      const td = document.createElement("td");
      if (idx === 0 && typeof value === "string") td.id = value;
      idx === 0 ? td.setAttribute("data", "member") : null;
      tdSetAtribut &&
        tdSetAtribut({
          tdEl: td,
          idx,
          databaseValue: value,
        });

      td.classList.add(
        "relative",
        "border",
        "border-1",
        "border-primary_dark",
        "align-top",
        "py-2",
        ...stylesTdName,
        ...tdStylesCustom(idx),
        ...styles
      );

      td.innerHTML = idx === 0 ? value : tdInnerHtml(value);

      this.#trEl?.append(td);
    });
  }

  #createBtnsContainer(tableRowId: string, iconsSVG: string[]) {
    const tdEL = document.createElement("td");
    tdEL.classList.add("border", "border-primary_dark");

    const btnsContainerEL = document.createElement("div");

    btnsContainerEL.classList.add(
      "min-w-24",
      "h-full",
      "flex",
      "justify-center",
      "gap-1"
    );

    iconsSVG.forEach((iconSVG) => {
      if (!this.#memberId) return;

      const btnIcon = document.createElement("button");
      btnIcon.setAttribute("data-member-id", this.#memberId);
      btnIcon.setAttribute("data-row-id", tableRowId);
      btnIcon.innerHTML = iconSVG;
      btnIcon.classList.add(
        "fill-dark",
        "hover:bg-hover_bg",
        "cursor-pointer",
        "w-6",
        "rounded-full",
        "p-1.5"
      );
      btnsContainerEL.append(btnIcon);
      const svgEl = btnIcon?.querySelector("svg");

      const iconDataAttribute =
        svgEl &&
        "data-" + Object.keys(svgEl?.dataset)[0].replace(/([A-Z])/g, "-$1");

      iconDataAttribute && btnIcon.setAttribute(iconDataAttribute, "");
      svgEl?.setAttribute("data-row-id", tableRowId);
      svgEl?.setAttribute("data-member-id", this.#memberId);
      const pathEl = btnIcon?.querySelector("path");
      pathEl?.setAttribute("data-row-id", tableRowId);
      pathEl?.setAttribute("data-member-id", this.#memberId);
    });
    tdEL.append(btnsContainerEL);
    this.#trEl?.append(tdEL);
  }

  #createTableBody({
    tdDataList,
    icons = [],
    tdInnerHtml,
    tdStylesCustom = () => [],
    tdStyles = [],
    tdSetAtribut,
  }: TypeTableBody) {
    this.#tableBodyEl.classList.add("bg-white");
    tdDataList.forEach((tdData, idx) => {
      this.#memberId = tdData.id;
      const tableRowId = Math.random().toString();
      this.#createTr(tableRowId);
      this.#createTdFirst(idx);
      this.#createtTdElems(
        tdData,
        tdStylesCustom,
        tdStyles,
        tdInnerHtml,
        tdSetAtribut
      );
      icons.length > 0 && this.#createBtnsContainer(tableRowId, icons);
      this.#tableEl?.append(this.#tableBodyEl);
    });
  }
}

export class TableView {
  #parentEl: HTMLElement | null;
  #tableEl = document.createElement("table");
  #noDataContainerEl = document.createElement("div");

  constructor(parentEl: string) {
    this.#parentEl = document.getElementById(parentEl);
  }

  noDataContainer() {
    this.#noDataContainerEl.innerText = "Brak zapisanych danych";
    this.#noDataContainerEl.id = "noDataContainer";
    this.#noDataContainerEl.classList.add("text-center", "text-danger", "h-10");
    this.#parentEl?.append(this.#noDataContainerEl);
  }

  createTable(styles: string[] = []) {
    this.#tableEl.classList.add(
      "table",
      "table-xs",
      "bg-primary_dark",
      "relative",
      "rounded-sm",
      ...styles
    );
    this.#tableEl.id = "tableMembers";
    this.#parentEl?.append(this.#tableEl);
    this.#tableEl = this.#tableEl;
  }

  createTableHead({ headers, stylesTh = [] }: TypeTableHaed) {
    new TableHeadView(headers, stylesTh);
  }

  createTableBody({
    tdDataList,
    icons = [],
    tdInnerHtml,
    tdStylesCustom = () => [],
    tdStyles = [],
    tdSetAtribut,
  }: TypeTableBody) {
    new TableBodyView({
      tdDataList,
      icons,
      tdInnerHtml,
      tdStylesCustom,
      tdStyles,
      tdSetAtribut,
    });
  }
}
