export class InputCreator {
  static createInput(
    { name, type, required, placeholder }: any,
    styles: string[] = []
  ) {
    const input = document.createElement("input");
    input.id = name;
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("required", required || false);
    input.setAttribute("placeholder", placeholder);
    input.classList.add(
      "p-0.5",
      "border",
      "border-gray-300",
      "focus:border-blue-500",
      "focus:outline-none",
      ...styles
    );
    input.style.cssText = `
      ::placeholder {
        color: red; 
      }
    `;
    return input;
  }
}
