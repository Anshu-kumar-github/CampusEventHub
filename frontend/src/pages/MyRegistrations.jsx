import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import api from "../services/api";

const MyRegistrations = () => {

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/registrations/my",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setRegistrations(
        response.data.registrations
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        My Registrations
      </h1>

      <div className="grid gap-4">

        {registrations.map((registration) => (

          <div
            key={registration.id}
            className="border p-4 rounded shadow"
          >

            <h2 className="font-bold text-xl">
              {registration.title}
            </h2>

            <p>
              Category: {registration.category}
            </p>

            <p>
              Location: {registration.location}
            </p>

            <p>
              Status:{" "}
              <span
                className={
                  registration.status === "approved"
                    ? "text-green-600"
                    : registration.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {registration.status}
              </span>
            </p>

          </div>

        ))}

      </div>

    </Layout>

  );

};

export default MyRegistrations;