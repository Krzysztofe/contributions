import { ModelMemberSettings } from "../../sharedModels/moedelMemberSettings";
import { Helpers } from "../../utils/helpers";

export class StateMembers {
  static sortedMembers: ModelMemberSettings[] = [];

  static setMembers(members: ModelMemberSettings[] | []) {
    let processMembers: ModelMemberSettings[] | [];

    if (members.length > 0) {
      processMembers = members.map(({ fullname, email, id, join_date }) => {

        return {
          id,
          fullname,
          email,
          join_date,
        };
      });
    } else {
      processMembers = [];
    }

    this.sortedMembers = Helpers.sortList(processMembers);
  }
}
