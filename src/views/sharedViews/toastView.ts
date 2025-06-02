export class ToastView {
  #innerText: string;
  constructor(innerText: string) {
    this.#innerText = innerText;
    this.#createToast();
  }

  #createToast() {
    const toastEL = document.getElementById("toast");
    toastEL && (toastEL.innerText = this.#innerText);
    toastEL?.classList.add("animateToast");

    setTimeout(() => {
      toastEL?.classList.remove("animateToast");
    }, 1500);
  }
}
