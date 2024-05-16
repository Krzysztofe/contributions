import { HeaderCreator } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { LoginFormPrinter } from "./loginFormPrinter";

class LoginManager {
  constructor() {
    new LoadigPageCreator();
    new HeaderCreator(["grid", "place-items-center"]);
    new LoginFormPrinter();
  }
}

new LoginManager();
