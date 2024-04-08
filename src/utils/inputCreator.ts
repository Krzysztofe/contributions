export class InputCreator {
  static createInput(
    { name, type, required, placeholder }: any,
    styles: string[] = []
  ) {
    // console.log('',name)
    const input = document.createElement("input");
    input.id = name;
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("required", required || false);
    input.setAttribute("placeholder", placeholder);
    input.classList.add(
      "border-solid",
      "border-2",
      "border-slate-300",
      ...styles
    );
    return input;
  }
}
