import { Navigate } from "react-router-dom";

const AdminRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/" replace />;

  if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
