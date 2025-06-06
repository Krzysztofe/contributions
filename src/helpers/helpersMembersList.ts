export class HelpersMemberList {
  static sortList(array: any[]) {
    const sortedList = array?.sort((a, b) => {
      if ("fullname" in a && "fullname" in b) {
        let nameA = a.fullname.toLowerCase();
        let nameB = b.fullname.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    });

    return sortedList;
  }
}
