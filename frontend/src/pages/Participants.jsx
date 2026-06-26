import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";
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

      <h1 className="text-3xl font-bold mb-6">
        Participants
      </h1>

      <table className="w-full border">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
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

      <tr key={participant.id}>

        <td>{participant.name}</td>

        <td>{participant.email}</td>

        <td>{participant.status}</td>

        <td>

          <button
            onClick={() =>
              approveRegistration(participant.id)
            }
            className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
          >
            Approve
          </button>

          <button
            onClick={() =>
              rejectRegistration(participant.id)
            }
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Reject
          </button>

        </td>

      </tr>

    ))

  )}

</tbody>

      </table>

    </Layout>

  );

};

export default Participants;