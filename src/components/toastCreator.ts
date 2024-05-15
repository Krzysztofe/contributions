export class ToastCreator {
  #parentEl: HTMLElement | null;
  #innerText: string;
  constructor(parentEl: string, innerText:string) {
    this.#parentEl = document.querySelector(parentEl);
    this.#innerText = innerText
    this.createToast();
  }
  createToast() {
    const toastEl = document.createElement("div");
    toastEl.innerText = this.#innerText;
    toastEl.classList.add(
      "fixed",
      "top-14",
      "left-[50%]",
      "p-1",
      "px-6",
      "animateToast",
      "text-white",
      "text-sm",
      "bg-black_opacity"
    );
    this.#parentEl?.prepend(toastEl);

    setTimeout(() => {
      toastEl.remove();
    }, 1500);
  }
}
