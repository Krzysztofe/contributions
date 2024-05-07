export const isUserLoged = () => {
  const userLoged = localStorage.getItem("jwt");
  !userLoged && (location.href = "/");
};
