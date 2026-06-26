import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {

  logout();

  toast.success("Logged out successfully!");

  setTimeout(() => {
    navigate("/");
  }, 500);

};

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>

    </Layout>

  );

};

export default Dashboard;