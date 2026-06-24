import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border rounded-lg p-4 shadow">

      <h2 className="text-xl font-bold">
        {event.title}
      </h2>

      <p>{event.category}</p>

      <p>{event.location}</p>

      <p>
        {new Date(event.start_date)
          .toLocaleDateString()}
      </p>

      <Link
        to={`/events/${event.id}`}
        className="text-blue-500"
      >
        View Details
      </Link>

    </div>
  );
};

export default EventCard;