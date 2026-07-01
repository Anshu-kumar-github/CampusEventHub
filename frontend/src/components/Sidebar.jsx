// // import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const Sidebar = () => {

// //   const { user } = useAuth();

// //   return (

// //     <div className="w-64 bg-gray-800 text-white min-h-screen p-4">

// //       <ul className="space-y-4">

// //         <li>
// //           <Link to="/dashboard">
// //             Dashboard
// //           </Link>
// //         </li>

// //         <li>
// //           <Link to="/events">
// //             Events
// //           </Link>
// //         </li>

// //         {user?.role === "student" && (
// //           <li>
// //             <Link to="/my-registrations">
// //               My Registrations
// //             </Link>
// //           </li>
// //         )}

// //         {(user?.role === "college_admin" ||
// //           user?.role === "super_admin") && (
// //           <>
// //             <li>
// //               <Link to="/create-event">
// //                 Create Event
// //               </Link>
// //             </li>

// //             <li>
// //               <Link to="/manage-events">
// //                 Manage Events
// //               </Link>
// //             </li>
// //           </>
// //         )}

// //       </ul>

// //     </div>

// //   );

// // };

// // export default Sidebar;


// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// import {
//   FaHome,
//   FaCalendarAlt,
//   FaClipboardList,
//   FaPlusCircle,
//   FaTasks
// } from "react-icons/fa";

// const Sidebar = () => {

//   const { user } = useAuth();

//   const menuClass = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
//       isActive
//         ? "bg-blue-600 text-white shadow-lg"
//         : "text-gray-300 hover:bg-blue-700 hover:text-white"
//     }`;

//   return (

//     <aside
//       className="
//         w-64
//         min-h-screen
//         bg-gradient-to-b
//         from-slate-900
//         via-blue-950
//         to-slate-900
//         text-white
//         p-6
//         flex
//         flex-col
//         shadow-2xl
//       "
//     >

//       {/* Logo */}

//       <div className="mb-10">

//         <h1 className="text-2xl font-bold">
//           CampusEventHub
//         </h1>

//         <p className="text-sm text-gray-400 mt-1">
//           Event Management
//         </p>

//       </div>

//       <nav className="space-y-3">

//         <NavLink
//           to="/dashboard"
//           className={menuClass}
//         >
//           <FaHome />
//           Dashboard
//         </NavLink>

//         <NavLink
//           to="/events"
//           className={menuClass}
//         >
//           <FaCalendarAlt />
//           Events
//         </NavLink>

//         {user?.role === "student" && (

//           <NavLink
//             to="/my-registrations"
//             className={menuClass}
//           >
//             <FaClipboardList />
//             My Registrations
//           </NavLink>

//         )}

//         {(user?.role === "college_admin" ||
//           user?.role === "super_admin") && (
//           <>

//             <NavLink
//               to="/create-event"
//               className={menuClass}
//             >
//               <FaPlusCircle />
//               Create Event
//             </NavLink>

//             <NavLink
//               to="/manage-events"
//               className={menuClass}
//             >
//               <FaTasks />
//               Manage Events
//             </NavLink>

//           </>
//         )}

//       </nav>

//     </aside>

//   );

// };

// export default Sidebar;

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import {
  FaHome,
  FaCalendarAlt,
  FaClipboardList,
  FaPlusCircle,
  FaTasks,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    toast.success("Logged out successfully!");

    navigate("/");

  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-blue-700 hover:text-white"
    }`;

  return (

    <aside
      className="
        w-64
        min-h-screen
        bg-gradient-to-b
        from-slate-900
        via-blue-950
        to-slate-900
        text-white
        p-6
        flex
        flex-col
        shadow-xl
      "
    >

      {/* Logo */}

      <div className="mb-10">

        <h1 className="text-2xl font-bold">
          CampusEventHub
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Event Management System
        </p>

      </div>

      {/* Menu */}

      <nav className="space-y-3 flex-1">

        <NavLink
          to="/dashboard"
          className={menuClass}
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/events"
          className={menuClass}
        >
          <FaCalendarAlt />
          Events
        </NavLink>

        {user?.role === "student" && (

          <NavLink
            to="/my-registrations"
            className={menuClass}
          >
            <FaClipboardList />
            My Registrations
          </NavLink>

        )}

        {(user?.role === "college_admin" ||
          user?.role === "super_admin") && (
          <>

            <NavLink
              to="/create-event"
              className={menuClass}
            >
              <FaPlusCircle />
              Create Event
            </NavLink>

            <NavLink
              to="/manage-events"
              className={menuClass}
            >
              <FaTasks />
              Manage Events
            </NavLink>

          </>

        )}

      </nav>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="
          mt-10
          flex
          items-center
          justify-center
          gap-3
          bg-red-600
          hover:bg-red-700
          transition
          rounded-xl
          py-3
          font-semibold
          shadow-lg
        "
      >

        <FaSignOutAlt />

        Logout

      </button>

    </aside>

  );

};

export default Sidebar;