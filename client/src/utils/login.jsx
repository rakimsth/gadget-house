import moment from "moment";
import jwtDecode from "jwt-decode";
import { getToken } from "./session";

export const isLoggedIn = () => {
  const token = getToken("access_token");
  if (!token) return false;
  const { exp } = jwtDecode(token);
  const now = moment(new Date().valueOf()); // timeStamps
  const expDate = moment.unix(exp); // timeStamps
  if (now > expDate) return false;
  return true;
};

export const validRole = (role) => {
  if (role === "") return true;
  const token = getToken("access_token");
  const { data: user } = jwtDecode(token);
  const isValid = user.roles.includes(role);
  if (!isValid) return false;
  return true;
};
