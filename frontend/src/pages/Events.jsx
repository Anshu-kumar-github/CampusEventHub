import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import api from "../services/api";
import toast from "react-hot-toast";

const Events = () => {

  const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
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

const filteredEvents = events.filter((event) => {

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

});
if (loading) {
  
    return (

  <Layout>

    <div className="text-center py-10">

      <p className="text-gray-500 mb-4">
        Loading events...
      </p>

      <div className="flex justify-center">

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

    </div>

  </Layout>

);
  }

  return (

    <Layout>

      <div
  className="
    bg-gradient-to-r
    from-blue-600
    via-indigo-600
    to-purple-700
    rounded-xl
    text-white
    p-8
    mb-8
    shadow-lg
  "
>

  <h1 className="text-4xl font-bold">
    Explore Campus Events 🎉
  </h1>

  <p className="mt-2 text-blue-100">
    Discover hackathons, workshops, seminars, sports and cultural activities.
  </p>

</div>

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
    placeholder="Search Events..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
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
    onChange={(e) => setCategory(e.target.value)}
    className="
      md:w-60
      border
      rounded-lg
      p-3
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  >
    <option value="All">All Categories</option>
    <option value="Hackathon">Hackathon</option>
    <option value="Workshop">Workshop</option>
    <option value="Seminar">Seminar</option>
    <option value="Sports">Sports</option>
    <option value="Cultural">Cultural</option>
    <option value="Technology">Technology</option>
    <option value="Tech">Tech</option>
  </select>

</div>

      {filteredEvents.length === 0 ? (

  <div className="text-center py-10 text-gray-500">
    <h2 className="text-xl font-semibold">
    No Events Found
  </h2>

  <p className="text-gray-500">
    Create your first event.
  </p>
</div>

) : (

  <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-6
  "
>

    {filteredEvents.map((event) => (
      <EventCard
        key={event.id}
        event={event}
      />
    ))}

  </div>

)}

    </Layout>

  );

};

export default Events;