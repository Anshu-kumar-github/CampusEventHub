import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers
} from "react-icons/fa";

const EventCard = ({ event }) => {

  const registeredParticipants =
    event.registered_count || 0;

  const seatsLeft =
    event.max_participants - registeredParticipants;

    const getBannerImage = () => {

  switch (event.category) {

    case "Hackathon":
      return "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200";

    case "Workshop":
      return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200";

    case "Seminar":
      return "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200";

    case "Sports":
      return "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200";

    case "Cultural":
      return "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200";

    default:
      return "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200";

  }

};

  return (

    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-2xl
        hover:scale-105
        transition
        duration-300
        overflow-hidden
      "
    >

      {/* Event Banner */}

      <div className="relative">

  <img
    src={getBannerImage()}
    alt={event.category}
    className="w-full h-48 object-cover"
  />

  <span
    className="
      absolute
      top-3
      right-3
      bg-green-600
      text-white
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
    "
  >
    Open
  </span>

</div>

      {/* Card Body */}

      <div className="p-5">

        {/* Category Badge */}

        <span
          className="
            inline-block
            bg-blue-100
            text-blue-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
          "
        >
          {event.category}
        </span>

        {/* Title */}

        <h2 className="text-2xl font-bold mt-4">
          {event.title}
        </h2>

        {/* Location */}

        <div className="flex items-center gap-2 mt-4 text-gray-600">

          <FaMapMarkerAlt className="text-red-500" />

          <span>{event.location}</span>

        </div>

        {/* Date */}

        <div className="flex items-center gap-2 mt-2 text-gray-600">

          <FaCalendarAlt className="text-blue-500" />

          <span>
            {new Date(event.start_date).toLocaleDateString()}
          </span>

        </div>

        {/* Participants */}

        <div className="flex items-center gap-2 mt-2 text-gray-600">

          <FaUsers className="text-green-600" />

          <span>
            {registeredParticipants} / {event.max_participants}
            {" "}Participants
          </span>

        </div>

        {/* Seats Left */}

        <p
  className={`mt-3 font-semibold ${
    seatsLeft > 20
      ? "text-green-600"
      : seatsLeft > 5
      ? "text-yellow-500"
      : "text-red-600"
  }`}
>

  Seats Left: {seatsLeft}

</p>

        {/* Button */}

        <Link
          to={`/events/${event.id}`}
          className="
            mt-5
            block
            w-full
            rounded-lg
            bg-blue-600
            py-3
            text-center
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          View Details →
        </Link>

      </div>

    </div>

  );

};

export default EventCard;