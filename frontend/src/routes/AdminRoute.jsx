import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  console.log("AdminRoute User:", user);

  if (
    user?.role !== "college_admin" &&
    user?.role !== "super_admin"
  ) {
    console.log("Redirecting because user is not admin");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;