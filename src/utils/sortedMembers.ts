export const sortedMembers = (members: any) => {
  const selectedData = members.map(
    ({
      fullname,
      phone,
      id,
    }: {
      fullname: string;
      phone: string;
      id: string;
    }) => {
      return { id, fullname, phone };
    }
  );

  const sortedData = selectedData.sort((a: any, b: any) => {
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
  return sortedData;
};
