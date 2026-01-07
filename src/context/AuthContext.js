import { createContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  studentlogin as apiStudentLogin,
  teacherlogin as apiTeacherLogin,
  schooladminlogin as apiSchoolAdminLogin,
  logout as apiLogout,
} from "../api/auth";
import api from "../api/axiosClient";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Restore session on refresh
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/getMe");
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
       
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

const handleLogin = async (apiFn, values) => {
  try {
    const res = await apiFn(values);


    const token = res.data?.token;
    // Grab the first object that exists among possible roles
    const user =
      res.data?.user ||
      res.data?.student ||
      res.data?.teacher ||
      res.data?.admin;
 
    if (!token || !user) {
      throw new Error("Invalid login response");
    }

    // Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Update context
    setUser(user);

    return { token, user };
  } catch (err) {
    console.error("Login error:", err);
    throw err; // Let the UI show the error
  }
};


  // 🔐 Generic login handler
  // const handleLogin = async (apiFn, values) => {
  //   const res = await apiFn(values);

  //   if (!res.data?.token || !res.data?.user) {
  //     throw new Error("Invalid login response");
  //   }

  //   localStorage.setItem("token", res.data.token);
  //   localStorage.setItem("user", JSON.stringify(res.data.user));
  //   setUser(res.data.user);

  //   return res.data;
  // };

  const login = (values) => handleLogin(apiLogin, values);
  const studentlogin = (values) => handleLogin(apiStudentLogin, values);
  const teacherlogin = (values) => handleLogin(apiTeacherLogin, values);
  const schooladminlogin = (values) =>
    handleLogin(apiSchoolAdminLogin, values);

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        studentlogin,
        teacherlogin,
        schooladminlogin,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// import { createContext, useEffect, useState } from "react";
// import {
//   login as apiLogin,
//   studentlogin as apiStudentLogin,
//   teacherlogin as apiTeacherLogin,
//   schooladminlogin as apiSchoolAdminLogin,
//   logout as apiLogout,
// } from "../api/auth";
// import api from "../api/axiosClient";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔄 Restore session on refresh
//   useEffect(() => {
//     const restoreUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.get("/auth/getMe");
//         setUser(res.data);
//         localStorage.setItem("user", JSON.stringify(res.data));
//       } catch {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     restoreUser();
//   }, []);

//   // 🔐 Generic login handler
//   const handleLogin = async (apiFn, values) => {
//     const res = await apiFn(values);

//     if (!res.data?.token || !res.data?.user) {
//       throw new Error("Invalid login response");
//     }

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     setUser(res.data.user);

//     return res.data;
//   };

//   const login = (values) => handleLogin(apiLogin, values);
//   const studentlogin = (values) => handleLogin(apiStudentLogin, values);
//   const teacherlogin = (values) => handleLogin(apiTeacherLogin, values);
//   const schooladminlogin = (values) =>
//     handleLogin(apiSchoolAdminLogin, values);

//   const logout = async () => {
//     await apiLogout();
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         studentlogin,
//         teacherlogin,
//         schooladminlogin,
//         logout,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
