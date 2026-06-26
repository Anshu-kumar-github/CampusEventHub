import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import api from "../services/api";
import toast from "react-hot-toast";

const Events = () => {

  const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
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
if (loading) {
    return (
      <Layout>
        <p className="text-center text-gray-500">
          Loading events...
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
        </p>
      </Layout>
    );
  }

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Events
      </h1>

      <input
        type="text"
        placeholder="Search Events"
        className="border p-2 mb-4 w-full"
      />

      <select
        className="border p-2 mb-4"
      >
        <option>All</option>
        <option>Hackathon</option>
        <option>Workshop</option>
        <option>Seminar</option>
      </select>

      {events.length === 0 ? (

  <div className="text-center py-10 text-gray-500">
    <h2 className="text-xl font-semibold">
    No Events Found
  </h2>

  <p className="text-gray-500">
    Create your first event.
  </p>
</div>

) : (

  <div className="grid md:grid-cols-3 gap-4">

    {events.map((event) => (
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