type ModelElementData ={
  text: string,
  iconClass: string,
  path:string
}


export class ListCreator {
  #nav: HTMLElement | null= null
  #ul: HTMLUListElement | null = null;
  #parentEl: HTMLElement | null;
  #elementsData: ModelElementData[];

  constructor(parent: string, elementsData: ModelElementData[]) {
    this.#parentEl = document.querySelector(parent);
    this.#elementsData = elementsData;
    this.#creataNav()
    this.#createUl(this.#parentEl, this.#elementsData);
  }

  #creataNav(){
    const navEl = document.createElement("nav")
    navEl.classList.add("relative")
    this.#parentEl?.append(navEl)
    this.#nav = navEl
  }

  #createUl(parentEl: HTMLElement | null, elementsData: ModelElementData[]) {
    if (!parentEl) return;
    this.#ul = document.createElement("ul");
    this.#ul.classList.add("flex");

    elementsData.forEach(({ text, iconClass, path }: ModelElementData) => {
      const li = document.createElement("li");
      li.classList.add("flex");

      const link = document.createElement("a");
      link.setAttribute("href", path);
      link.classList.add("flex");
      li.append(link);

      const textSpan = document.createElement("div");
      textSpan.innerText = text;
      textSpan.classList.add(
        "hidden",
        "lg:block",
        "text-sm",
        "lg:text-base",
        "flex",
        "self-center"
      );

      link.append(textSpan);
      if (iconClass) {
        const iconSpan = document.createElement("div");
        iconSpan.classList.add(
          "fa",
          iconClass,
          "m-1",
          "first:ml-6",
          "sm:ml-8",
          "md:ml-4",
          "text-sm",
          "lg:text-base"
        );
        iconSpan.style.color = "dark";
        iconSpan.setAttribute("aria-hidden", "true");
        link.prepend(iconSpan);
      }

      if (text === "Wyloguj") {
        const logout = () => {
          localStorage.removeItem("jwt");
          location.href = "/";
        };

        li.addEventListener("click", logout);
      }

      this.#ul?.append(li);
    });
    this.#nav?.append(this.#ul);
  }
}
