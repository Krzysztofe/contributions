import { ListCreator } from "../../listCreator";

type ModelElementData = {
  text: string;
  iconSVG: string;
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
    elementsData.forEach(({ text, iconSVG, path }: ModelElementData) => {
      this.#liEl = document.createElement("li");
      this.#liEl.classList.add("flex", "hover:opacity-50");

      this.#linkEl = document.createElement("a");
      this.#linkEl.setAttribute("href", path);
      this.#linkEl.classList.add("flex");

      this.#liEl.append(this.#linkEl);

      this.#textEl = document.createElement("div");
      this.#textEl.innerText = text;
      this.#textEl.classList.add("hidden", "lg:block", "flex", "self-center");

      this.#linkEl.append(this.#textEl);

      this.#iconEl = document.createElement("div");
      this.#iconEl.innerHTML = iconSVG;

      this.#iconEl.classList.add(
        "m-1",
        "w-4",
        "fill-dark",
        "first:ml-6",
        "sm:ml-8",
        "md:ml-4"
      );
      this.#iconEl.style.color = "dark";
      this.#iconEl.setAttribute("aria-hidden", "true");
      this.#linkEl.prepend(this.#iconEl);

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
