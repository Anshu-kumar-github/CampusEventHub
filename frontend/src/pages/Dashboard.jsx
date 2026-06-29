import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

import StatCard from "../components/StatCard";

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

  const handleLogout = () => {

    logout();

    toast.success("Logged out successfully!");

    setTimeout(() => {
      navigate("/");
    }, 500);

  };

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

      <div
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
      color="text-blue-600"
      to="/events"
    />

    <StatCard
      icon={<FaClipboardList />}
      title="My Registrations"
      value={totalRegistrations}
      color="text-yellow-500"
      to="/my-registrations"
    />

    <StatCard
      icon={<FaUsers />}
      title="Approved"
      value={approvedRegistrations}
      color="text-green-600"
      to="/my-registrations"
    />

    <StatCard
      icon={<FaStar />}
      title="Pending"
      value={pendingRegistrations}
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
  color="text-blue-600"
  to="/events"
/>

<StatCard
  icon={<FaUsers />}
  title="Participants"
  value={dashboard?.participants ?? "--"}
  color="text-green-600"
  to="/events"
/>

<StatCard
  icon={<FaClipboardList />}
  title="Pending Approvals"
  value={dashboard?.pendingApprovals ?? "--"}
  color="text-yellow-500"
  to="/events"
/>

<StatCard
  icon={<FaStar />}
  title="Average Rating"
  value={dashboard?.averageRating ?? "--"}
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

<div className="mb-10">

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

</div>

        {/* View Events */}

        <Link to="/events">

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

          </div>

        </Link>

        {/* Student */}

        {user?.role === "student" && (

          <Link to="/my-registrations">

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

              <FaClipboardList
                className="
                  text-4xl
                  text-yellow-500
                  mx-auto
                  mb-3
                "
              />

              <h3 className="font-semibold text-lg">
                My Registrations
              </h3>

            </div>

          </Link>

        )}

        {/* Admin */}

        {(user?.role === "college_admin" ||
          user?.role === "super_admin") && (

          <>
            <Link to="/create-event">

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

            </Link>

            {/* <Link to="/events"> */}
            <Link to="/manage-events">

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

            </Link>

          </>

        )}

      </div>

      <h2 className="text-2xl font-bold mb-5">
  {user?.role === "student"
    ? "Recent Registrations"
    : "Recent Events"}
</h2>

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

          <h3 className="text-xl font-semibold">
            {event.title}
          </h3>

          <p className="text-gray-500 mt-2">
            {event.category}
          </p>

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

    )}

  </div>

)}

      {/* Logout */}

      <button
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
      </button>

    </Layout>

  );

};

export default Dashboard;