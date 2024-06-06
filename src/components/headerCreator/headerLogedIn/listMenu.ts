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
  constructor({ parentEl, elementsData}: ModelListCreator) {
    super(parentEl);
    this.#createLiElems(elementsData);
  }

  #createLiElems(elementsData:ModelElementData[]) {
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

      this.ulEl?.append(li);
    });
  }
}
