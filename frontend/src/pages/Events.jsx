// // const Events = () => {
// //   return <h1>Events Page</h1>;
// // };

// // export default Events;

// import Layout from "../components/Layout";

// const Events = () => {

//   return (

//     <Layout>

//       <h1 className="text-3xl font-bold">
//         Events
//       </h1>

//       <p className="mt-4">
//         Event listing will appear here.
//       </p>

//     </Layout>

//   );

// };

// export default Events;

import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import api from "../services/api";

const Events = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    try {

      const response =
        await api.get("/events");

      setEvents(response.data.events);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-5">
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

      <div className="grid md:grid-cols-3 gap-4">

        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}

      </div>

    </Layout>

  );

};

export default Events;