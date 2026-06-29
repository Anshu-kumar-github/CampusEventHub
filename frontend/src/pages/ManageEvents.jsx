import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

// import {
//   FaEdit,
//   FaTrash,
//   FaUsers,
//   FaChartBar
// } from "react-icons/fa";

import {
  FaEdit,
  FaTrash,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaTheaterMasks
} from "react-icons/fa";



const ManageEvents = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [sortBy, setSortBy] = useState("Newest");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    setLoading(true);

    try {

      const response =
        await api.get("/events");

      setEvents(response.data.events);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load events."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(
        "Event deleted successfully."
      );

      fetchEvents();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete event."
      );

    }

  };

  const filteredEvents = events
  .filter((event) => {

    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      event.category === category;

    return (
      matchesSearch &&
      matchesCategory
    );

  })
  .sort((a, b) => {

    if (sortBy === "Newest") {
      return (
        new Date(b.start_date) -
        new Date(a.start_date)
      );
    }

    if (sortBy === "Oldest") {
      return (
        new Date(a.start_date) -
        new Date(b.start_date)
      );
    }

    return 0;

  });

  const totalEvents = events.length;

const hackathons = events.filter(
  (event) => event.category === "Hackathon"
).length;

const workshops = events.filter(
  (event) => event.category === "Workshop"
).length;

const culturals = events.filter(
  (event) => event.category === "Cultural"
).length;

  if (loading) {

    return (

      <Layout>

        <div className="flex justify-center py-10">

          <div
            className="
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-gray-300
              border-t-blue-600
            "
          ></div>

        </div>

      </Layout>

    );

  }

  return (

    <Layout>
    {/* <h2 className="text-2xl font-semibold">
  No Matching Events
</h2>

<p className="text-gray-500 mt-2">
  Try changing your search or category filter.
</p> */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Manage Events
        </h1>

        <p className="text-gray-500 mt-2">
          Create, edit, analyze and manage all campus events.
        </p>

      </div>

      <div className="mb-8">

  <h1 className="text-3xl font-bold">
    Manage Events
  </h1>

  <p className="text-gray-500 mt-2">
    Create, edit, analyze and manage all campus events.
  </p>

</div>

<div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-4
    gap-6
    mb-8
  "
>

  <div className="bg-white rounded-xl shadow-md p-5">

    <FaCalendarAlt
      className="text-3xl text-blue-600 mb-3"
    />

    <h3 className="text-gray-500">
      Total Events
    </h3>

    <p className="text-3xl font-bold">
      {totalEvents}
    </p>

  </div>

  <div className="bg-white rounded-xl shadow-md p-5">

    <FaLaptopCode
      className="text-3xl text-green-600 mb-3"
    />

    <h3 className="text-gray-500">
      Hackathons
    </h3>

    <p className="text-3xl font-bold">
      {hackathons}
    </p>

  </div>

  <div className="bg-white rounded-xl shadow-md p-5">

    <FaChalkboardTeacher
      className="text-3xl text-yellow-500 mb-3"
    />

    <h3 className="text-gray-500">
      Workshops
    </h3>

    <p className="text-3xl font-bold">
      {workshops}
    </p>

  </div>

  <div className="bg-white rounded-xl shadow-md p-5">

    <FaTheaterMasks
  className="text-3xl text-purple-600 mb-3"
/>

    <h3 className="text-gray-500">
      Cultural
    </h3>

    <p className="text-3xl font-bold">
      {culturals}
    </p>

  </div>

</div>

{/* Search & Filter */}

<div
  className="
    flex
    flex-col
    md:flex-row
    gap-4
    mb-8
  "
>

  <input
    type="text"
    placeholder="🔍 Search Events..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="
      flex-1
      border
      rounded-lg
      p-3
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  />

  <select
    value={category}
    onChange={(e) =>
      setCategory(e.target.value)
    }
    className="
      border
      rounded-lg
      p-3
    "
  >

    <option>All</option>
    <option>Hackathon</option>
    <option>Workshop</option>
    <option>Seminar</option>
    <option>Sports</option>
    <option>Cultural</option>

  </select>

</div>

<select
  value={sortBy}
  onChange={(e) =>
    setSortBy(e.target.value)
  }
  className="
    border
    rounded-lg
    p-3
  "
>

  <option>Newest</option>

  <option>Oldest</option>

</select>



      {filteredEvents.length === 0 ? (

        <div className="text-center py-12">

          <h2 className="text-2xl font-semibold">
  No Matching Events
</h2>

<p className="text-gray-500 mt-2">
  Try changing your search or category filter.
</p>

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {filteredEvents.map((event) => (

            <div
              key={event.id}
              className="
                bg-white
                rounded-xl
                shadow-md
                hover:shadow-xl
                hover:scale-105
                transition
                duration-300
                p-6
              "
            >

              <h2 className="text-2xl font-bold mb-3">
                {event.title}
              </h2>

              <span
                className="
                  inline-block
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  mb-4
                "
              >
                {event.category}
              </span>

              <p className="text-gray-600">
                📍 {event.location}
              </p>

              <p className="text-gray-600 mt-2">
                📅{" "}
                {new Date(
                  event.start_date
                ).toLocaleDateString()}
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                  mt-6
                "
              >

                <Link
                  to={`/edit-event/${event.id}`}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-yellow-500
                    hover:bg-yellow-600
                    text-white
                    px-4
                    py-2
                    transition
                  "
                >
                  <FaEdit />
                  Edit
                </Link>

                <Link
                  to={`/participants/${event.id}`}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    transition
                  "
                >
                  <FaUsers />
                  Participants
                </Link>

                <Link
                  to={`/analytics/${event.id}`}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-purple-600
                    hover:bg-purple-700
                    text-white
                    px-4
                    py-2
                    transition
                  "
                >
                  <FaChartBar />
                  Analytics
                </Link>

                <button
                  onClick={() =>
                    handleDelete(event.id)
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-4
                    py-2
                    transition
                  "
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
        

      )}

    </Layout>

  );

};

export default ManageEvents;