import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SchoolAdminRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/" replace />;

  if (user.role !== "SchoolAdmin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SchoolAdminRoute;
//  const SchoolAdminRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/" replace />;

//   if (user.model !== "Teacher" || user.role !== "SchoolAdmin") {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };
//  export default SchoolAdminRoute;

