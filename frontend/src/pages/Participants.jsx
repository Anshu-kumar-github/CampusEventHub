import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaTimes,
  FaUserCircle
} from "react-icons/fa";
const Participants = () => {

  const { eventId } = useParams();

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {

  setLoading(true);

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        `/registrations/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    setParticipants(
      response.data.participants
    );

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to load participants."
    );

  } finally {

    setLoading(false);

  }

};

  const approveRegistration = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.put(
        `/registrations/${id}/approve`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success(
  "Participant approved successfully."
);

      fetchParticipants();

    } catch (error) {

      console.error(error);

toast.error(
  error.response?.data?.message ||
  "Failed to approve participant."
);

    }

  };

  const rejectRegistration = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.put(
        `/registrations/${id}/reject`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      toast.success("Participant rejected successfully.");

      fetchParticipants();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to reject participant."
      );

    }

  };
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

      <div className="mb-8">

  <h1 className="text-3xl font-bold">
    Event Participants
  </h1>

  <p className="text-gray-500 mt-2">
    Approve or reject registrations for this event.
  </p>

</div>

      <div
  className="
    overflow-x-auto
    bg-white
    rounded-xl
    shadow-md
  "
>

<table className="min-w-full">

        <thead className="bg-blue-600 text-white">

  <tr>

    <th className="px-6 py-4 text-left">
      User
    </th>

    <th className="px-6 py-4 text-left">
      Email
    </th>

    <th className="px-6 py-4 text-left">
      Status
    </th>

    <th className="px-6 py-4 text-center">
      Actions
    </th>

  </tr>

</thead>

        <tbody>

  {participants.length === 0 ? (

    <tr>

  <td
    colSpan="4"
    className="py-10 text-center"
  >

    <h2 className="text-xl font-semibold">
      No Participants
    </h2>

    <p className="text-gray-500">
      No one has registered yet.
    </p>

  </td>

</tr>

  ) : (

    participants.map((participant) => (

      <tr
  key={participant.id}
  className="
    even:bg-gray-50
    hover:bg-blue-50
    transition
    duration-200
  "
>

  {/* User */}

  <td className="px-6 py-4">

    <div className="flex items-center gap-3">

      <div
        className="
          w-10
          h-10
          rounded-full
          bg-blue-600
          text-white
          flex
          items-center
          justify-center
          font-bold
        "
      >

        {participant.name.charAt(0).toUpperCase()}

      </div>

      <div>

        <p className="font-semibold">
          {participant.name}
        </p>

        <p className="text-sm text-gray-500">
          {participant.college || "CampusEventHub"}
        </p>

      </div>

    </div>

  </td>

  {/* Email */}

  <td className="px-6 py-4 text-gray-700">

    {participant.email}

  </td>

  {/* Status */}

  <td className="px-6 py-4">

    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        participant.status === "approved"
          ? "bg-green-100 text-green-700"
          : participant.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >

      {participant.status === "approved" && "🟢 Approved"}

      {participant.status === "pending" && "🟡 Pending"}

      {participant.status === "rejected" && "🔴 Rejected"}

    </span>

  </td>

  {/* Actions */}

  <td className="px-6 py-4">

    <div className="flex justify-center gap-2">

      <button
        onClick={() =>
          approveRegistration(participant.id)
        }
        className="
          flex
          items-center
          gap-2
          bg-green-600
          hover:bg-green-700
          text-white
          px-4
          py-2
          rounded-lg
          transition
        "
      >

        <FaCheck />

        Approve

      </button>

      <button
        onClick={() =>
          rejectRegistration(participant.id)
        }
        className="
          flex
          items-center
          gap-2
          bg-red-600
          hover:bg-red-700
          text-white
          px-4
          py-2
          rounded-lg
          transition
        "
      >

        <FaTimes />

        Reject

      </button>

    </div>

  </td>

</tr>

    ))

  )}

</tbody>

      </table>
      </div>

    </Layout>

  );

};

export default Participants;