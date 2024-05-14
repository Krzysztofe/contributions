export class ValidationMember {
  #members: any;
  #newMember: any;
  #fullnameNewMember: string | null = null;
  isMember: [] = [];
  #errorEl: HTMLElement | null;

  constructor(members: any, formValues: any) {
    this.#members = members;
    this.#newMember = formValues;
    this.isMember;
    this.#errorEl = document.getElementById("customErrorMessage");
    this.#createFullname();
    this.#isMemberRecodred();
    this.#printError();
  }

  #createFullname() {
    const fullName = `${this.#newMember.firstname} ${this.#newMember.lastname}`;
    this.#fullnameNewMember = fullName;
  }

  #isMemberRecodred() {
    const findMember = this.#members.filter(
      ({ fullname }: { fullname: string }) => {
        return (
          fullname.toLowerCase() === this.#fullnameNewMember?.toLowerCase()
        );
      }
    );
    this.isMember = findMember;
  }
  #printError() {
    if (this.#errorEl && this.isMember.length > 0) {
      this.#errorEl.innerText = "Imię i nazwisko już zapisane";
    }
  }
}
