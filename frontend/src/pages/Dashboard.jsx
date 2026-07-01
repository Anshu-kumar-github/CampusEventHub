import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";

import {
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaStar,
  FaPlus,
  FaTasks
} from "react-icons/fa";

const Dashboard = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

const [registrations, setRegistrations] = useState([]);
const [dashboard, setDashboard] = useState(null);

const totalEvents = events.length;

const totalRegistrations =
  registrations.length;

const approvedRegistrations =
  registrations.filter(
    (registration) =>
      registration.status === "approved"
  ).length;

const pendingRegistrations =
  registrations.filter(
    (registration) =>
      registration.status === "pending"
  ).length;

  const recentEvents =
  user?.role === "student"
    ? events.slice(0, 3)
    : dashboard?.recentEvents || [];

const recentRegistrations =
  registrations.slice(0, 3);

  // const handleLogout = () => {

  //   logout();

  //   toast.success("Logged out successfully!");

  //   setTimeout(() => {
  //     navigate("/");
  //   }, 500);

  // };

  const fetchEvents = async () => {

  try {

    const response =
      await api.get("/events");

    setEvents(response.data.events);

  } catch (error) {

    console.error(error);

    toast.error(
      "Failed to load dashboard."
    );

  }

};

const fetchRegistrations = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.get(
      "/registrations/my",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setRegistrations(
      response.data.registrations
    );

  } catch (error) {

    console.error(error);

    toast.error(
      "Failed to load registrations."
    );

  }

};

const fetchAdminDashboard = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/dashboard/admin",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setDashboard(
      response.data.dashboard
    );

  } catch (error) {

    console.error(error);

    toast.error(
      "Failed to load dashboard."
    );

  }

};

  useEffect(() => {

  fetchEvents();

  if (user?.role === "student") {

    fetchRegistrations();

  }

  if (
    user?.role === "college_admin" ||
    user?.role === "super_admin"
  ) {

    fetchAdminDashboard();

  }

}, [user]);

  return (

    <Layout>

      {/* Welcome Banner */}

      {/* <div
        className="
          bg-linear-to-r
          from-blue-600
          to-indigo-700
          rounded-xl
          text-white
          p-8
          mb-8
          shadow-lg
        "
      >

        <h1 className="text-4xl font-bold">
          Good Morning, {user?.name} 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Welcome back to CampusEventHub.
        </p>

        <p className="mt-1 text-blue-200">
          Manage and participate in campus events.
        </p>

      </div> */}
      <div
  className="
    bg-gradient-to-r
    from-blue-600
    via-indigo-600
    to-purple-700
    rounded-3xl
    shadow-xl
    p-8
    md:p-10
    mb-10
    text-white
    flex
    flex-col
    md:flex-row
    justify-between
    items-center
  "
>

  {/* Left */}

  <div>

    <h1 className="text-4xl md:text-5xl font-bold">

      Good Morning,
      <span className="text-yellow-300">
        {" "}
        {user?.name}
      </span>
      👋

    </h1>

    <p className="mt-4 text-lg text-blue-100">

      Welcome back to CampusEventHub.

    </p>

    <p className="mt-2 text-blue-200">

      Manage and participate in exciting campus events.

    </p>

    <Link
      to="/events"
      className="
        inline-block
        mt-6
        bg-white
        text-blue-700
        px-6
        py-3
        rounded-xl
        font-semibold
        hover:bg-blue-50
        transition
      "
    >
      Explore Events →
    </Link>

  </div>

  {/* Right */}

  <div className="mt-8 md:mt-0 text-7xl">

    🎓

  </div>

</div>

      {/* Statistics */}

      <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-4
    gap-6
    mb-10
  "
>
        {user?.role === "student" && (
  <>
    <StatCard
  icon={<FaCalendarAlt />}
  title="Upcoming Events"
  value={totalEvents}
  subtitle="Available Campus Events"
  color="text-blue-600"
  to="/events"
/>

<StatCard
  icon={<FaClipboardList />}
  title="My Registrations"
  value={totalRegistrations}
  subtitle="Events You've Joined"
  color="text-yellow-500"
  to="/my-registrations"
/>

<StatCard
  icon={<FaUsers />}
  title="Approved"
  value={approvedRegistrations}
  subtitle="Successfully Approved"
  color="text-green-600"
  to="/my-registrations"
/>

<StatCard
  icon={<FaStar />}
  title="Pending"
  value={pendingRegistrations}
  subtitle="Awaiting Approval"
  color="text-orange-500"
  to="/my-registrations"
/>
  </>
)}

{(
  user?.role === "college_admin" ||
  user?.role === "super_admin"
) && (
  <>
    <StatCard
  icon={<FaCalendarAlt />}
  title="Total Events"
  value={dashboard?.totalEvents ?? "--"}
  subtitle="All Campus Events"
  color="text-blue-600"
  to="/events"
/>

<StatCard
  icon={<FaUsers />}
  title="Participants"
  value={dashboard?.participants ?? "--"}
  subtitle="Registered Students"
  color="text-green-600"
  to="/events"
/>

<StatCard
  icon={<FaClipboardList />}
  title="Pending"
  value={dashboard?.pendingApprovals ?? "--"}
  subtitle="Awaiting Approval"
  color="text-yellow-500"
  to="/events"
/>

<StatCard
  icon={<FaStar />}
  title="Rating"
  value={dashboard?.averageRating ?? "--"}
  subtitle="Average Feedback"
  color="text-purple-600"
/>
  </>
)}
      </div>
        

      

      {/* Quick Actions */}

      <h2 className="text-2xl font-bold mb-5">
        Quick Actions
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-10
        "
      >


      {/* Recent Events */}

{/* <div className="mb-10">

  <h2 className="text-2xl font-bold mb-5">
    Recent Events
  </h2>

  <div
    className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
    "
  >

    {(
      user?.role === "college_admin" ||
      user?.role === "super_admin"
    ) &&

      dashboard?.recentEvents?.map((event) => (

        <div
          key={event.id}
          className="
            bg-white
            rounded-xl
            shadow-md
            p-5
            hover:shadow-xl
            hover:scale-105
            transition
            duration-300
          "
        >

          <h3 className="text-xl font-semibold mb-2">
            {event.title}
          </h3>

          <p className="text-gray-600">
            {event.category}
          </p>

          <p className="text-gray-500 mt-2">
            📍 {event.location}
          </p>

          <p className="text-gray-500">
            📅{" "}
            {new Date(
              event.start_date
            ).toLocaleDateString()}
          </p>

          <Link
            to={`/events/${event.id}`}
            className="
              inline-block
              mt-4
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            View Details →
          </Link>

        </div>

      ))

    }

  </div>

</div> */}

        {/* View Events */}

        {/* <Link to="/events">

          <div
            className="
              bg-white
              rounded-xl
              shadow-md
              hover:shadow-xl
              hover:scale-105
              transition
              duration-300
              p-6
              text-center
            "
          >

            <FaCalendarAlt
              className="
                text-4xl
                text-blue-600
                mx-auto
                mb-3
              "
            />

            <h3 className="font-semibold text-lg">
              View Events
            </h3>
            <p className="text-gray-500 mt-2">
    Browse all available events
  </p>

          </div>

        </Link> */}
        <QuickActionCard
  icon={<FaCalendarAlt />}
  title="View Events"
  description="Browse all campus events"
  to="/events"
  color="text-blue-600"
/>

        {/* Student */}

        {user?.role === "student" && (

          <QuickActionCard
  icon={<FaClipboardList />}
  title="My Registrations"
  description="Track your registered events"
  to="/my-registrations"
  color="text-yellow-500"
/>

        )}

        {/* Admin */}

        {(user?.role === "college_admin" ||
          user?.role === "super_admin") && (

          <>
            {/* <Link to="/create-event">

              <div
                className="
                  bg-white
                  rounded-xl
                  shadow-md
                  hover:shadow-xl
                  hover:scale-105
                  transition
                  duration-300
                  p-6
                  text-center
                "
              >

                <FaPlus
                  className="
                    text-4xl
                    text-green-600
                    mx-auto
                    mb-3
                  "
                />

                <h3 className="font-semibold text-lg">
                  Create Event
                </h3>

              </div>

            </Link> */}

            <QuickActionCard
  icon={<FaPlus />}
  title="Create Event"
  description="Add a new campus event"
  to="/create-event"
  color="text-green-600"
/>

            {/* <Link to="/events"> */}
            {/* <Link to="/manage-events">

              <div
                className="
                  bg-white
                  rounded-xl
                  shadow-md
                  hover:shadow-xl
                  hover:scale-105
                  transition
                  duration-300
                  p-6
                  text-center
                "
              >

                <FaTasks
                  className="
                    text-4xl
                    text-purple-600
                    mx-auto
                    mb-3
                  "
                />

                <h3 className="font-semibold text-lg">
                  Manage Events
                </h3>

              </div>

            </Link> */}

            <QuickActionCard
  icon={<FaTasks />}
  title="Manage Events"
  description="Edit, delete and monitor events"
  to="/manage-events"
  color="text-purple-600"
/>

          </>

        )}

      </div>

      <div
  className="
    flex
    justify-between
    items-center
    mb-6
  "
>

  <h2 className="text-2xl font-bold">

    {user?.role === "student"
      ? "Recent Registrations"
      : "Recent Events"}

  </h2>

  <Link
    to="/events"
    className="
      text-blue-600
      font-semibold
      hover:underline
    "
  >
    View All →
  </Link>

</div>

{/* Student Recent Registrations */}

{user?.role === "student" && (

  <div
    className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
      mb-10
    "
  >

    {recentRegistrations.length === 0 ? (

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          p-6
          col-span-full
          text-center
        "
      >

        <h3 className="text-xl font-semibold">
          No Registrations
        </h3>

        <p className="text-gray-500 mt-2">
          Register for an event to see it here.
        </p>

      </div>

    ) : (

      recentRegistrations.map((registration) => (

        <div
          key={registration.id}
          className="
            bg-white
            rounded-xl
            shadow-md
            hover:shadow-xl
            transition
            duration-300
            p-6
          "
        >

          <h3 className="text-xl font-semibold">
            {registration.title}
          </h3>

          <p className="text-gray-500 mt-2">
            Status:
            <span
              className={`ml-2 font-semibold ${
                registration.status === "approved"
                  ? "text-green-600"
                  : registration.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {registration.status}
            </span>
          </p>

        </div>

      ))

    )}

  </div>

)}

{/* Admin Recent Events */}

{(
  user?.role === "college_admin" ||
  user?.role === "super_admin"
) && (

  <div
    className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
      mb-10
    "
  >

    {recentEvents.length === 0 ? (

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          p-6
          col-span-full
          text-center
        "
      >

        <h3 className="text-xl font-semibold">
          No Recent Events
        </h3>

        <p className="text-gray-500 mt-2">
          Create an event to see it here.
        </p>

      </div>

    ) : (

      recentEvents.map((event) => (

        <div
          key={event.id}
          className="
            bg-white
            rounded-xl
            shadow-md
            hover:shadow-xl
            transition
            duration-300
            p-6
          "
        >
        <div
  className="
    h-32
    rounded-xl
    mb-5
    bg-gradient-to-r
    from-blue-600
    via-indigo-600
    to-purple-700
    flex
    items-center
    justify-center
    text-white
    text-2xl
    font-bold
  "
>
  {event.category}
</div>

          <h3 className="text-xl font-semibold">
            {event.title}
          </h3>

          <span
  className="
    inline-block
    bg-blue-100
    text-blue-700
    px-3
    py-1
    rounded-full
    text-sm
    mt-3
  "
>
  {event.category}
</span>

          <p className="text-gray-500">
            📍 {event.location}
          </p>

          <p className="text-gray-500">
            📅{" "}
            {new Date(
              event.start_date
            ).toLocaleDateString()}
          </p>

          <Link
            to={`/events/${event.id}`}
            className="
  inline-flex
  items-center
  justify-center
  mt-6
  px-4
  py-2
  rounded-lg
  bg-blue-600
  text-white
  hover:bg-blue-700
  transition
"
          >
            View Details →
          </Link>

        </div>

      ))

    )}

  </div>

)}
<div
  className="
    mt-12
    bg-gradient-to-r
    from-indigo-600
    via-blue-600
    to-purple-700
    rounded-3xl
    text-white
    p-8
    flex
    flex-col
    md:flex-row
    justify-between
    items-center
  "
>

  <div>

    <h2 className="text-3xl font-bold">

      Stay Connected 🚀

    </h2>

    <p className="mt-3 text-blue-100">

      Create, manage and participate in amazing
      campus events effortlessly.

    </p>

  </div>

  <Link
    to="/events"
    className="
      mt-6
      md:mt-0
      bg-white
      text-blue-700
      px-6
      py-3
      rounded-xl
      font-semibold
      hover:bg-blue-50
      transition
    "
  >
    Explore Events
  </Link>

</div>

      {/* Logout */}

      {/* <button
        onClick={handleLogout}
        className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-6
          py-3
          rounded-xl
          shadow-md
          transition
        "
      >
        Logout
      </button> */}

    </Layout>

  );

};

export default Dashboard;