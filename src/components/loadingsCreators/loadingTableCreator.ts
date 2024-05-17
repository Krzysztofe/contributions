export class LoadingTableCreator {
   createSpinner(container: HTMLElement) {
    const spinner = document.createElement("div");
    spinner.classList.add(
      "loading",
      "loading-spinner",
      "loading-lg",
      "text-accent"
    );

    container.append(spinner);
  }

   createLoadingContainer() {
    const container = document.createElement("div");
    container.id = "loadingContainer";
    container.classList.add(
      "grid",
      "place-content-center",
      "h-full",
      "w-full",
      "p-8",
      "bg-white_opacity",
      "fixed",
      "top-0",
      "left-0",
      "z-50"
    );

    this.createSpinner(container);
    document.querySelector("body")?.append(container);
  }

   removeLoadingContainer() {
    document.getElementById("loadingContainer")?.remove();
  }
}
