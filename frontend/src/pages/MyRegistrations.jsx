import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

const MyRegistrations = () => {

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);

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
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch registrations"
      );

    }
    finally {
      setLoading(false);
    }

  };

  if (loading) {
  return (
    <Layout>
      <div className="flex justify-center py-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    </Layout>
  );
}

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        My Registrations
      </h1>
      

      {/* <div className="grid gap-4">

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

      </div> */}
      {registrations.length === 0 ? (

  <div className="text-center py-10">
  

    <h2 className="text-xl font-semibold">
      No Registrations
    </h2>

    <p className="text-gray-500 mt-2">
      Register for an event to see it here.
    </p>

  </div>

) : (

  <div className="grid gap-4">

    {registrations.map((registration) => (

      <div
        key={registration.id}
        className="bg-white rounded-lg shadow-md p-5"
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

)}

    </Layout>

  );

};

export default MyRegistrations;