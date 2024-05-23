import { ModelMember } from "../sharedModels/moedelMember";
import { Helpers } from "../utils/helpers";

export class StateMembers {
  static sortedMembers: [] | any = [];

  static setMembers(members: ModelMember[]) {
    const processMembers = members.map(({ fullname, phone, id, join_date }) => {
      return { id, fullname, phone, join_date };
    });

    const sortedMembers = Helpers.sortList(processMembers);

    this.sortedMembers = sortedMembers;
  }
}
