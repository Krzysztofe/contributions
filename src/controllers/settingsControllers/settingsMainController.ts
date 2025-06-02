import { AutoLogout } from "../../utils/autoLogout";
import { HeaderLogedInView } from "../../views/sharedViews/headerLogedInView/headerLogedInView";
import { URL_MEMBERS } from "../../config/apiUrl";
import { Helpers } from "../../utils/helpers";
import { LoadigPageView } from "../../views/sharedViews/loadersViews/loadingPageView";
import { FormCreateMemberBuilder } from "../../views/pages/settingsViews/formCreateMember/formCreateMemberBuilder";
import { PopupDeleteMemberView } from "../../views/pages/settingsViews/popupDeleteMemberView";
import { MembersModel } from "../../models/settingsModels/membersModel";
import { PopupEditMemberView } from "../../views/pages/settingsViews/popupEditMemberView";
import { TableSettingsBuilder } from "../../views/pages/settingsViews/tableSettings/TableSettingsBuilder";


class SettingsController {
  #GETMembersOptions = {
    url: URL_MEMBERS,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  constructor() {
    this.#init();
  }

  async #init() {
    Helpers.isUserLoged();
    new LoadigPageView();
    new HeaderLogedInView(["flex", "items-center", "justify-between"]);
    const members = await Helpers.fetchData(this.#GETMembersOptions);
    MembersModel.setMembers(members);
    new FormCreateMemberBuilder();
    new TableSettingsBuilder();
    new PopupEditMemberView();
    new PopupDeleteMemberView();
    new AutoLogout();
  }
}

new SettingsController();
