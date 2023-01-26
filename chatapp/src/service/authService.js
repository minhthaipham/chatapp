import decode from "jwt-decode";
import { useSelector } from "react-redux";
export const checkTokenLocal = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user;
  }
  return null;
};

export const logOutLocal = () => {
  localStorage.removeItem("user");
  if (checkTokenLocal() === null) {
    return true;
  }
  return false;
};
