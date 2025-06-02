import { TypeMemberSettings } from "../../sharedTypes/typeMemberSettings";
import { Helpers } from "../../utils/helpers";

export class MembersModel {
  static sortedMembers: TypeMemberSettings[] = [];

  static setMembers(members: TypeMemberSettings[] | []) {
    let processMembers: TypeMemberSettings[] | [];

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
