import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";

const Participants = () => {

  const { eventId } = useParams();

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          `/registrations/event/${eventId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setParticipants(
        response.data.participants
      );

    } catch (error) {

      console.log(error);

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

      fetchParticipants();

    } catch (error) {

      console.log(error);

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

      fetchParticipants();

    } catch (error) {

      console.log(error);

    }

  };

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

          {participants.map((participant) => (

            <tr key={participant.id}>

              <td>{participant.name}</td>

              <td>{participant.email}</td>

              <td>{participant.status}</td>

              <td>

                <button
                  onClick={() =>
                    approveRegistration(
                      participant.id
                    )
                  }
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectRegistration(
                      participant.id
                    )
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </Layout>

  );

};

export default Participants;