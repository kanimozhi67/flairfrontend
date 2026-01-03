
import { createContext, useState } from "react";
import {
  login as apiLogin,
  studentlogin as apiStudentLogin,
  teacherlogin as apiTeacherLogin,
  schooladminlogin as apiSchoolAdminLogin,
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
  const teacherlogin = async (values) => {
    const res = await apiTeacherLogin(values);
    if (!res.data.error) setLoggedIn(true);
    return res.data;
  };
  const schooladminlogin = async (values) => {
    const res = await apiSchoolAdminLogin(values);
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
        schooladminlogin,
        teacherlogin,
        signup,
        studentSignup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
