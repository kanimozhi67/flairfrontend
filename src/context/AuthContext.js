// import { createContext, useState } from "react";
// import { login as apiLogin, studentlogin as apiStudentLogin, signup as apiSignup, studentSignup as apiStudentSignup, logout as apiLogout } from "../api/auth";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const login = async (values) => {
//     const res = await apiLogin(values);
//     if (!res.data.error) setLoggedIn(true);
//     return res.data;
//   };
//   const studentlogin = async (values) => {
//     const res = await apiStudentLogin(values);
//     if (!res.data.error) setLoggedIn(true);
//     return res.data;
//   };

//   const signup = async (values) => {
//     const res = await apiSignup(values);
//     return res.data;
//   };
//   const studentSignup = async (values) => {
//     const res = await apiStudentSignup(values);
//     return res.data;
//   };

//   const logout = async () => {
//     await apiLogout();
//     setLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ loggedIn, login, signup, studentSignup, studentlogin,  logout }}>
//       {children}
//     </AuthContext.Provider>
//   );import { createContext, useState, useEffect } from "react";
import { createContext, useState } from "react";
import {
  login as apiLogin,
  studentlogin as apiStudentLogin,
  signup as apiSignup,
  studentSignup as apiStudentSignup,
  logout as apiLogout,
} from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (values) => {
    const res = await apiLogin(values);
    if (!res.data.error) setLoggedIn(true);
    return res.data;
  };

  const studentlogin = async (values) => {
    const res = await apiStudentLogin(values);
    if (!res.data.error) setLoggedIn(true);
    return res.data;
  };

  const signup = async (values) => {
    const res = await apiSignup(values);
    return res.data;
  };

  const studentSignup = async (values) => {
    const res = await apiStudentSignup(values);
    return res.data;
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login,
        studentlogin,
        signup,
        studentSignup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
