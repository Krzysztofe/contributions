export class ListCreator {
  #ul: HTMLUListElement | null = null;
  #parentEl: HTMLElement | null;
  #elements: any[];

  constructor(parent: string, elements: any[]) {
    this.#parentEl = document.querySelector(parent);
    this.#elements = elements;
    this.#createUl(this.#parentEl, this.#elements);
  }

  #createUl(parentEl: HTMLElement | null, elements: any[]) {
    if (!parentEl) return;
    this.#ul = document.createElement("ul");
    this.#ul.classList.add("flex");

    elements.forEach(({ text, iconClass, path }: any) => {
      const li = document.createElement("li");
      li.classList.add("flex");

      const link = document.createElement("a");
      link.setAttribute("href", path);
      link.classList.add("flex");
      li.append(link);

      const textSpan = document.createElement("span");
      textSpan.innerText = text;
      textSpan.classList.add("hidden", "md:block");

      link.append(textSpan);
      if (iconClass) {
        const iconSpan = document.createElement("div");
        iconSpan.classList.add("fa", iconClass, "m-1", "ml-4");
        iconSpan.setAttribute("aria-hidden", "true");
        link.prepend(iconSpan);
      }

      this.#ul?.append(li);
    });
    parentEl?.append(this.#ul);
  }
}
