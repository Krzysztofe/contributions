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

    elements.forEach(element => {
      const li = document.createElement("li")
      li.classList.add("flex")

      const textSpan = document.createElement("span");
      textSpan.innerText = element.text;
      textSpan.classList.add("hidden", "md:block", );
      
      li.append(textSpan);
      if (element.iconClass) {
        const iconSpan = document.createElement("div");
        iconSpan.classList.add("fa", element.iconClass, "m-1", "ml-4");
        iconSpan.setAttribute("aria-hidden", "true");
        li.prepend(iconSpan);
      }

      this.#ul?.append(li);
    });
    parentEl?.append(this.#ul);
  }
}
