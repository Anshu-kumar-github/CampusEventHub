// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {

//   const { user } = useAuth();
//     console.log(user);
//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">

//       <h1 className="font-bold text-xl">
//         CampusEventHub
//       </h1>

//       <div>
//         {/* Welcome {user?.name || "User"} */}
//         {/* Welcome User */}
//         Welcome {user?.name} ({user?.role})
//       </div>

//     </nav>
//   );
// };

// export default Navbar;

import { useAuth } from "../context/AuthContext";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {

  const { user } = useAuth();

  return (

    <nav
      className="
        bg-white
        shadow-sm
        border-b
        px-8
        py-4
        flex
        justify-between
        items-center
      "
    >

      {/* Left */}

      <div>

        <h2 className="text-xl font-bold text-gray-800">
          CampusEventHub
        </h2>

      </div>

      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >

        <button
          className="
            relative
            text-gray-600
            hover:text-blue-600
            transition
          "
        >

          <FaBell className="text-xl" />

          <span
            className="
              absolute
              -top-1
              -right-1
              w-2.5
              h-2.5
              rounded-full
              bg-red-500
            "
          ></span>

        </button>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <FaUserCircle
            className="
              text-4xl
              text-blue-600
            "
          />

          <div>

            <p className="text-sm text-gray-500">
              Welcome
            </p>

            <p className="font-semibold">

              {user?.name}

            </p>

          </div>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;