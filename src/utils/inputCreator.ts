export class InputCreator {
  static createInput({ type, name, required }: any, styles: string[] = []) {
    const input = document.createElement("input");
    input.id = name;
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("required", required || false);
    input.classList.add("border-solid", "border-2", "border-slate-300", ...styles);
    return input;
  }
}
