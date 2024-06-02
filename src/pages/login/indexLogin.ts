import { HeaderCreator } from "../../components/headerCreator/headerCreator";
import { LoadigPageCreator } from "../../components/loadingsCreators/loadingPageCreator";
import { FormLoginPrinter } from "./formLoginPrinter";

class LoginManager {
  constructor() {
    new LoadigPageCreator();
    new HeaderCreator(["grid", "place-items-center"]);
    new FormLoginPrinter();
  }
}

new LoginManager();

