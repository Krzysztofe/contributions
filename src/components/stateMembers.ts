import { ModelMember } from "../sharedModels/moedelMember";
import { Helpers } from "../utils/helpers";

export class StateMembers {
  static sortedMembers: [] | ModelMember[] = [];

  static setMembers(members: ModelMember[]) {
    const processMembers = members.map(({ fullname, phone, id }) => {
      return { id, fullname, phone };
    });

    const sortedMembers = Helpers.sortList(processMembers);

    this.sortedMembers = sortedMembers;
  }
}
