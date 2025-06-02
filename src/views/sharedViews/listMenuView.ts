import { ListView } from "../sharedViews/listView";

type TypeElementData = {
  text: string;
  iconSVG: string;
  path: string;
};

type TypeListView = {
  parentEl: string;
  elementsData: TypeElementData[];
};

export class ListMenuView extends ListView {
  #liEl: HTMLElement | null = null;
  #linkEl: HTMLElement | null = null;
  #textEl: HTMLElement | null = null;
  #iconEl: HTMLElement | null = null;

  constructor({ parentEl, elementsData }: TypeListView) {
    super(parentEl);
    this.#createLiElems(elementsData);
  }

  #createLiElems(elementsData: TypeElementData[]) {
    elementsData.forEach(({ text, iconSVG, path }: TypeElementData) => {
      this.#liEl = document.createElement("li");
      this.#liEl.classList.add(
        "flex",
        "ml-4",
        "md:ml-3",
        "rounded-full",
        "p-1",
        "hover:bg-hover_bg"
      );

      this.#linkEl = document.createElement("a");
      this.#linkEl.setAttribute("href", path);
      this.#linkEl.classList.add("flex");

      this.#liEl.append(this.#linkEl);

      this.#textEl = document.createElement("div");
      this.#textEl.innerText = text;
      this.#textEl.classList.add(
        "hidden",
        "lg:block",
        "flex",
        "self-center",
        "pr-1"
      );

      this.#linkEl.append(this.#textEl);

      this.#iconEl = document.createElement("div");
      this.#iconEl.innerHTML = iconSVG;

      this.#iconEl.classList.add("m-1", "w-4", "fill-dark");
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
