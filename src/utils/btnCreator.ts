// import "./style.css";

export class BtnCreator {
  static createBtn(innerText: string) {
    const btnEl = document.createElement("button");
    btnEl.setAttribute("type", "submit");
    btnEl.innerText = innerText;
    btnEl.classList.add(
      "text-center",
      "w-1/2",
      "py-1",
      "bg-gray-500",
      "m-auto",
      "mt-2"
    );
    return btnEl;
  }
}
