type ModelElementData = {
  text: string;
  iconClass: string;
  path: string;
};

type ModelListCreator = {
  parentEl: string;
  elementsData: ModelElementData[];
  navStyles?: string[];
};

export class ListCreator {
  #navStyles: string[];
  #nav = document.querySelector("nav");
  protected ulEl: HTMLUListElement | null = null;
  #parentEl: HTMLElement | null;
  #elementsData: ModelElementData[];

  constructor({ parentEl, elementsData, navStyles }: ModelListCreator) {
    this.#parentEl = document.querySelector(parentEl);
    this.#elementsData = elementsData;
    this.#navStyles = navStyles || [];
    this.#createUl(this.#parentEl, this.#elementsData);
  }

  #createUl(parentEl: HTMLElement | null, elementsData: ModelElementData[]) {
    if (!parentEl) return;
    this.ulEl = document.createElement("ul");
    this.ulEl.classList.add("flex");
    this.#parentEl?.append(this.ulEl);
  }
}
