import Cookies from "js-cookie";
export const getToken = () => {
  const token = Cookies.get("token");

  return token || "";
};

export const setToken = (token: string) => {
  return Cookies.set("token", token);
};
