import { ModelMember } from "../sharedModels/moedelMember";

export class StateMembers {
  static sortedMembers: [] | ModelMember[] = [];

  static processMembers(members: ModelMember[]) {
    const selectedMembers = members.map(({ fullname, phone, id }) => {
      return { id, fullname, phone };
    });
    const sortedMembers = selectedMembers.sort((a, b) => {
      let nameA = a.fullname.toLowerCase();
      let nameB = b.fullname.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedMembers;
  }

  static setMembers(members: ModelMember[]) {
    this.sortedMembers = this.processMembers(members);
  }
}
