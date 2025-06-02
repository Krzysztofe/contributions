import { HeaderCreatorView } from "../../views/sharedViews/headerView";
import { LoadigPageView } from "../../views/sharedViews/loadersViews/loadingPageView";
import { FormLoginBuilder } from "../../views/pages/loginViews/formLoginBuilder";

class LoginMainController {
  constructor() {
    new LoadigPageView();
    new HeaderCreatorView(["grid", "place-items-center"]);
    new FormLoginBuilder();
  }
}

new LoginMainController();
