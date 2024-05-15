import { HeaderCreator } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { LoginPrinter } from "./loginPrinter";

class LoginManager {
  constructor() {
    this.#init();
  }
  #init() {
    new LoadigPageCreator();
    new HeaderCreator(["grid", "place-items-center"]);
    new LoginPrinter();
  }
}

new LoginManager();
