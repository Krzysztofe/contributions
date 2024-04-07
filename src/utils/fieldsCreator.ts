

export class FieldsCreator {
  static createFields(fields: any) {
    const containerEl = document.createElement("div");
    containerEl.classList.add("flex", "flex-col", "sm:bg-slate-200", "bg-white", "p-5");

    fields.forEach(({ label, type, name, required }: any) => {
      const labelEl = document.createElement("label");
      labelEl.innerText = label;
      const input = document.createElement("input");
      input.id = name;
      input.setAttribute("type", type);
      input.setAttribute("name", name);
      input.setAttribute("required", required || false);
      input.classList.add("border-solid", "border-2", "border-slate-300");

      const error = document.createElement("div");
      error.id = `${name}Error`;
      error.classList.add("text-xs", "h-3", "text-red-500");

      containerEl.append(labelEl);
      containerEl.append(input);
      containerEl.append(error);
    });

    return containerEl;
  }
}
