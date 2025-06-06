export class HelpersAuth {
    static isUserLogged() {
      const token = localStorage.getItem("jwt");
      if (!token) {
        location.href = "/";
      }
    }
  }