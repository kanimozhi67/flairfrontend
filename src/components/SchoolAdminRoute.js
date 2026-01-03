import { Navigate } from "react-router-dom";

const SchoolAdminRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/" replace />;

  if (user.role !== "SchoolAdmin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SchoolAdminRoute;
