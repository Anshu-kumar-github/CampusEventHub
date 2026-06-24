import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const { user } = useAuth();
    console.log(user);
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">

      <h1 className="font-bold text-xl">
        CampusEventHub
      </h1>

      <div>
        {/* Welcome {user?.name || "User"} */}
        {/* Welcome User */}
        Welcome {user?.name} ({user?.role})
      </div>

    </nav>
  );
};

export default Navbar;