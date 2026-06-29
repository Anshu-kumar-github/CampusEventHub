import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const { user } = useAuth();

  return (

    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">

      <ul className="space-y-4">

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/events">
            Events
          </Link>
        </li>

        {user?.role === "student" && (
          <li>
            <Link to="/my-registrations">
              My Registrations
            </Link>
          </li>
        )}

        {(user?.role === "college_admin" ||
          user?.role === "super_admin") && (
          <>
            <li>
              <Link to="/create-event">
                Create Event
              </Link>
            </li>

            <li>
              <Link to="/manage-events">
                Manage Events
              </Link>
            </li>
          </>
        )}

      </ul>

    </div>

  );

};

export default Sidebar;