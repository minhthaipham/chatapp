import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  //   const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
