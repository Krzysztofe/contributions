import { TypeMemberSettings } from "../../sharedTypes/typeMemberSettings";
import { HelpersMemberList } from "../../helpers/helpersMembersList";

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

    this.sortedMembers = HelpersMemberList.sortList(processMembers);
  }
}
