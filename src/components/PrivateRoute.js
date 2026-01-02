// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ user, children }) => {
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// export default PrivateRoute;
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Fallback to localStorage for first render
  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
