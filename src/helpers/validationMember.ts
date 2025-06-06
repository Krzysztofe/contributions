import { TypeMemberSettings } from "../sharedTypes/typeMemberSettings";
import { TypeNewMember } from "../sharedTypes/typeNewMember";

export class ValidationMember {
  #members: TypeMemberSettings[];
  #newMember: TypeNewMember;
  #fullnameNewMember: string | null = null;
  isMember: TypeMemberSettings[] | [] = [];
  #errorEl: HTMLElement | null;

  constructor(members: TypeMemberSettings[], formValues: TypeNewMember) {
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
