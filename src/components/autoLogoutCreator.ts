export class AutoLogoutCreator {
  #bodyEl = document.querySelector("body");
  #logoutTimer: ReturnType<typeof setTimeout> | undefined;
  #logoutAlert: ReturnType<typeof setTimeout> | undefined;
  #counterInterval: ReturnType<typeof setInterval> | undefined;

  constructor() {
    this.#startLogoutTimer();
    this.#setupEvents();
  }

  #logout() {
    localStorage.removeItem("jwt");
    location.href = "/";
  }

  #createAlert() {
    this.#bodyEl?.classList.add("overflow-hidden");
    const alertContainer = document.createElement("div");
    alertContainer.id = "alert";
    alertContainer.classList.add(
      "fixed",
      "top-0",
      "grid",
      "place-items-center",
      "w-screen",
      "h-screen",
      "bg-black_opacity",
      "z-50"
    );
    const printCounter = document.createElement("div");
    printCounter.classList.add(
      "grid",
      "place-items-center",
      "font-bold",
      "text-lg",
      "bg-white",
      "rounded-sm",
      "w-5/6",
      "max-w-96",
      "py-20",
      "text-center"
    );
    let counter = 60;
    printCounter.innerHTML = `Wylogowanie za </br> ${counter.toString()} s.`;

    this.#counterInterval = setInterval(() => {
      counter--;
      printCounter.innerHTML = `Wylogowanie za </br> ${counter.toString()} s.`;
    }, 1000);

    alertContainer.append(printCounter);
    this.#bodyEl?.append(alertContainer);
  }

  #removeAlert() {
    const alertCon = document.getElementById("alert");
    alertCon?.remove();
    clearInterval(this.#counterInterval);
  }

  #startLogoutTimer() {
    this.#logoutTimer = setTimeout(this.#logout, 5 * 60 * 1000 - 1000);
    this.#logoutAlert = setTimeout(this.#createAlert.bind(this), 4 * 60 * 1000);
  }

  #resetLogoutTimer() {
    clearTimeout(this.#logoutTimer);
    clearTimeout(this.#logoutAlert);
    this.#removeAlert();
    this.#startLogoutTimer();
  }
  #setupEvents() {
    document.addEventListener("mousemove", this.#resetLogoutTimer.bind(this));
    document.addEventListener("click", this.#resetLogoutTimer.bind(this));
  }
}
