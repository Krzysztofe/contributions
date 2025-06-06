import { TypeObjectString } from "../../sharedTypes/typeObjectString.ts";
import { MembersModel } from "../../models/settingsModels/membersModel.ts";
import { URL_MEMBERS } from "../../config/apiUrl.ts";
import { Helpers } from "../../helpers/helpers.ts";
import { ValidationGeneric } from "../../helpers/validationGeneric.ts";
import { LoadingTableSettingsView } from "../../views/pages/settingsViews/loadingTableSettingsView.ts";
import { ValidationMember } from "../../helpers/validationMember.ts";
import { TypeObjectAny } from "../../sharedTypes/typeObjectAny.ts";
import { ToastView } from "../../views/sharedViews/toastView.ts";
import { TypeNewMember } from "../../sharedTypes/typeNewMember.ts";
import { ReprintTableSettingsView } from "../../views/pages/settingsViews/tableSettings/reprintTableSettingsView.ts";

export class CreateMemberController {
  #formEl = document.querySelector("form");
  #errorsElems = document.querySelectorAll(".h-4");
  #formKeys: string[] | null = null;
  #loading = new LoadingTableSettingsView();
  #formValues: TypeObjectString | null = null;

  constructor() {
    this.#submitEvent();
  }

  #createNewMembers(fetchedMember: TypeObjectAny) {
    const { firstname, lastname, email, id, join_date } = fetchedMember;

    const newMember = {
      fullname: `${lastname} ${firstname}`,
      email,
      id,
      join_date: join_date?.slice(0, -3),
    };

    return MembersModel.sortedMembers
      ? [...MembersModel.sortedMembers, newMember]
      : [newMember];
  }

  #processFormValues(): TypeNewMember {
    if (!this.#formKeys || !this.#formValues) {
      return {
        firstname: "",
        lastname: "",
        email: "",
      };
    }

    return this.#formKeys.reduce((acc, key) => {
      if (this.#formValues) {
        acc[key as keyof TypeNewMember] = this.#formValues[key];
      }
      return acc;
    }, {} as TypeNewMember);
  }

  #clearErrors() {
    this.#errorsElems.forEach(
      (error) => ((error as HTMLElement).innerText = "")
    );
  }

  #validations(e: Event) {
    this.#clearErrors();
    this.#formValues = Helpers.getFormValues(e);
    this.#formKeys = Object.keys(this.#formValues);
    const areErrors =
      this.#formKeys && new ValidationGeneric(this.#formKeys).errors;

    if (areErrors && areErrors.length > 0) return;

    const isMemberRecord = new ValidationMember(
      MembersModel.sortedMembers,
      this.#processFormValues()
    ).isMember;
    if (isMemberRecord?.length > 0) return;
    return "go";
  }

  #POSTOptions() {
    return {
      url: URL_MEMBERS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: {
        firstname:
          (this.#formValues &&
            Helpers.capitalize(this.#formValues.firstname)) ||
          "",
        lastname:
          (this.#formValues && Helpers.capitalize(this.#formValues.lastname)) ||
          "",
        email: this.#formValues?.email || "",
        join_date: this.#formValues?.join_date || "",
      },
    };
  }

  async #handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.#validations(e) !== "go") return;

    console.log("uuuu");

    this.#loading.createLoading();
    const newMember = await Helpers.fetchData(this.#POSTOptions());
    const newMembers = this.#createNewMembers(newMember);
    document.getElementById("noDataContainer")?.remove();
    MembersModel.setMembers(newMembers);
    new ReprintTableSettingsView();
    this.#formEl?.reset();
    this.#loading.removeLoading();
    new ToastView("Zapisano");
  }

  #submitEvent() {
    Helpers.isUserLoged();
    this.#formEl?.addEventListener("submit", this.#handleSubmit.bind(this));
  }
}
