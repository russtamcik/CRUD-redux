import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { ROLE, TOKEN } from "../constants";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );
  const [role, setRole] = useState(Cookies.get(ROLE));
  const state = {
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
