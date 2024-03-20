export const createFields = (fields: any) => {
  const containerEl = document.createElement("div");
  containerEl.classList.add("flex", "flex-col", "bg-slate-50", "p-5");

  fields.forEach(({ label, type, name, required }: any) => {
    const labelEl = document.createElement("label");
    labelEl.innerText = label;

    const input = document.createElement("input");
    input.id = name;
    input.setAttribute("type", type || "text");
    input.setAttribute("name", name);
    input.setAttribute("required", required || false);
    input.classList.add("border-solid", "border-2", "border-indigo-600");

    const error = document.createElement("span");
    error.id = "error";
    error.classList.add("h-3");

    containerEl.append(label);
    containerEl.append(input);
    containerEl.append(error);
  });
  return containerEl;
};
