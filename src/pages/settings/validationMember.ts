export class ValidationMember {
  #members: any;
  #newMember: any;
  #fullname: string | null = null;

  constructor(members: any, formValues: any) {
    this.#members = members;
    this.#newMember = formValues;
    this.#createFullname();
    this.#isMemberIncluded();
  }

  #createFullname() {
    const fullName = `${this.#newMember.firstname} ${this.#newMember.lastname}`;
    this.#fullname = fullName;
  }

  #isMemberIncluded() {

    const findMember = this.#members.filter((member:any) => {
    return  member.fullName === "pp"
    })
    console.log("", this.#members);
    console.log("", this.#fullname);
  }
}
