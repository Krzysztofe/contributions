import { ModelMemberSettings } from "../../sharedModels/moedelMemberSettings";
import { ModelNewMember } from "../../sharedModels/modelNewMember";

export class ValidationMember {
  #members: ModelMemberSettings[];
  #newMember: ModelNewMember;
  #fullnameNewMember: string | null = null;
  isMember: ModelMemberSettings[] | [] = [];
  #errorEl: HTMLElement | null;

  constructor(members: ModelMemberSettings[], formValues: ModelNewMember) {
    this.#members = members;
    this.#newMember = formValues;
    this.#errorEl = document.getElementById("submitMemberError");
    this.#createFullname();
    this.#isMemberRecodred();
    this.#printError();
  }

  #createFullname() {
    const fullName = `${this.#newMember.lastname} ${this.#newMember.firstname}`;
    this.#fullnameNewMember = fullName.trim();
  }

  #isMemberRecodred() {
    const findMember = this.#members?.filter(
      ({ fullname }: { fullname: string }) => {
        return (
          fullname.toLowerCase() === this.#fullnameNewMember?.toLowerCase()
        );
      }
    );

    this.isMember = findMember;
  }
  #printError() {
    if (this.#errorEl && this.isMember?.length > 0) {
      this.#errorEl.innerText = "Imię i nazwisko już zapisane";
    }
  }
}
