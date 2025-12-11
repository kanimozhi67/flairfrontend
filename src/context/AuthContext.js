import { createContext, useState } from "react";
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (values) => {
    const res = await apiLogin(values);
    if (!res.data.error) setLoggedIn(true);
    return res.data;
  };

  const signup = async (values) => {
    const res = await apiSignup(values);
    return res.data;
  };

  const logout = async () => {
    await apiLogout();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
