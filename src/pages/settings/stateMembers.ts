import { ModelMemberSettings } from "../../sharedModels/moedelMemberSettings";
import { Helpers } from "../../utils/helpers";

export class StateMembers {
  static sortedMembers: ModelMemberSettings[] = [];

  static setMembers(members: ModelMemberSettings[] | []) {
    let processMembers: ModelMemberSettings[] | [];

    if (members.length > 0) {
      processMembers = members.map(({ fullname, phone, id, join_date }) => {
        const isPhoneFormat = phone?.includes("-");

        phone = isPhoneFormat
          ? phone
          : phone?.replace(/(.{3})/g, "$1-").slice(0, -1);

        return {
          id,
          fullname,
          phone,
          join_date,
        };
      });
    } else {
      processMembers = [];
    }

    this.sortedMembers = Helpers.sortList(processMembers);
  }
}
