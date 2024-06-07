import { ListCreator } from "../../listCreator";

type ModelElementData = {
  text: string;
  iconClass: string;
  path: string;
};

type ModelListCreator = {
  parentEl: string;
  elementsData: ModelElementData[];
};

export class ListMenu extends ListCreator {
  #liEl: HTMLElement | null = null;
  #linkEl: HTMLElement | null = null;
  #textEl: HTMLElement | null = null;
  #iconEl: HTMLElement | null = null;

  constructor({ parentEl, elementsData }: ModelListCreator) {
    super(parentEl);
    this.#createLiElems(elementsData);
  }

  #createLiElems(elementsData: ModelElementData[]) {
    elementsData.forEach(({ text, iconClass, path }: ModelElementData) => {
      this.#liEl = document.createElement("li");
      this.#liEl.classList.add("flex");

      this.#linkEl = document.createElement("a");
      this.#linkEl.setAttribute("href", path);
      this.#linkEl.classList.add("flex");

      this.#liEl.append(this.#linkEl);

      this.#textEl = document.createElement("div");
      this.#textEl.innerText = text;
      this.#textEl.classList.add(
        "hidden",
        "lg:block",
        "text-sm",
        "lg:text-base",
        "flex",
        "self-center"
      );

      this.#linkEl.append(this.#textEl);

      if (iconClass) {
        this.#iconEl = document.createElement("i");
        this.#iconEl.classList.add(
          "fa",
          iconClass,
          "m-1",
          "first:ml-6",
          "sm:ml-8",
          "md:ml-4",
          "text-sm",
          "lg:text-base"
        );
        this.#iconEl.style.color = "dark";
        this.#iconEl.setAttribute("aria-hidden", "true");
        this.#linkEl.prepend(this.#iconEl);
      }

      if (text === "Wyloguj") {
        const logout = () => {
          localStorage.removeItem("jwt");
          location.href = "/";
        };
        this.#liEl.addEventListener("click", logout);
      }
      this.ulEl?.append(this.#liEl);
    });
  }
}
