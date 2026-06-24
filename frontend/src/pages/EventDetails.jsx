// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import Layout from "../components/Layout";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const EventDetails = () => {

//   const { id } = useParams();
//   const { user } = useAuth();

//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     fetchEvent();
//   }, []);

//   const fetchEvent = async () => {

//     try {

//       const response =
//         await api.get(`/events/${id}`);

//       setEvent(response.data.event);

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   const handleRegister = async () => {

//   try {

//     const token =
//       localStorage.getItem("token");

//     await api.post(
//       "/registrations",
//       {
//         event_id: event.id
//       },
//       {
//         headers: {
//           Authorization:
//             `Bearer ${token}`
//         }
//       }
//     );

//     alert(
//       "Registration submitted"
//     );

//   } catch (error) {

//     alert(
//       error.response?.data?.message
//     );

//   }

// };

//   if (!event) {
//     return (
//       <Layout>
//         <p>Loading...</p>
//       </Layout>
//     );
//   }

//   return (

//     <Layout>

//       <h1 className="text-3xl font-bold mb-4">
//         {event.title}
//       </h1>

//       <p>
//         <strong>Category:</strong> {event.category}
//       </p>

//       <p>
//         <strong>Location:</strong> {event.location}
//       </p>

//       <p>
//         <strong>Organizer:</strong> {event.organizer_name}
//       </p>

//       <p>
//         <strong>College:</strong> {event.college}
//       </p>

//       <p>
//         <strong>Description:</strong>
//         {event.description}
//       </p>

//       <p>
//         <strong>Start:</strong>
//         {new Date(event.start_date)
//           .toLocaleString()}
//       </p>

//       <p>
//         <strong>End:</strong>
//         {new Date(event.end_date)
//           .toLocaleString()}
//       </p>

//       {user?.role === "student" && (
//   <button
//     onClick={handleRegister}
//     className="bg-green-600 text-white px-4 py-2 rounded mt-4"
//   >
//     Register For Event
//   </button>
// )}

//     </Layout>

//   );

// };

// export default EventDetails;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import FeedbackSection from "../components/FeedbackSection";
import CommentsSection from "../components/CommentsSection";

const EventDetails = () => {

  const { id } = useParams();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {

    try {

      const response =
        await api.get(`/events/${id}`);

      setEvent(response.data.event);

    } catch (error) {

      console.log(error);

    }

  };

  const handleRegister = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/registrations",
        {
          event_id: event.id
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Registration submitted"
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  if (!event) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-4">
        {event.title}
      </h1>

      <p>
        <strong>Category:</strong> {event.category}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Organizer:</strong> {event.organizer_name}
      </p>

      <p>
        <strong>College:</strong> {event.college}
      </p>

      <p>
        <strong>Description:</strong> {event.description}
      </p>

      <p>
        <strong>Start:</strong>{" "}
        {new Date(event.start_date)
          .toLocaleString()}
      </p>

      <p>
        <strong>End:</strong>{" "}
        {new Date(event.end_date)
          .toLocaleString()}
      </p>

      <div className="mt-4 flex gap-4">

        {user?.role === "student" && (
          <button
            onClick={handleRegister}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Register For Event
          </button>
        )}

        {(
  user?.role === "college_admin" ||
  user?.role === "super_admin"
) && (
  <>
    <Link
      to={`/participants/${event.id}`}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      View Participants
    </Link>

    <Link
      to={`/analytics/${event.id}`}
      className="bg-purple-500 text-white px-4 py-2 rounded"
    >
      Analytics
    </Link>
  </>
)}

      </div>
      <FeedbackSection
  eventId={event.id}
/>

<CommentsSection
  eventId={event.id}
/>

    </Layout>

  );

};

export default EventDetails;