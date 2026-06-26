import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CreateEvent = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    start_date: "",
    end_date: "",
    max_participants: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError("");

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSuccess("");
    setError("");

    if (!formData.title.trim()) {
  const message = "Title is required.";
  setError(message);
  toast.error(message);
  return;
}

    if (!formData.description.trim()) {
  const message = "Description is required.";
  setError(message);
  toast.error(message);
  return;
}

    if (!formData.category.trim()) {
      setError("Category is required.");
      toast.error("Category is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      toast.error("Location is required.");
      return;
    }

    if (!formData.start_date) {
      setError("Start Date is required.");
      toast.error("Start Date is required.");
      return;
    }

    if (!formData.end_date) {
      setError("End Date is required.");
      toast.error("End Date is required.");
      return;
    }

    if (!formData.max_participants) {
      setError("Maximum Participants is required.");
      toast.error("Maximum Participants is required.");
      return;
    }

    if (Number(formData.max_participants) <= 0) {
      setError("Maximum Participants must be greater than 0.");
      toast.error("Maximum Participants must be greater than 0.");
      return;
    }
    if (
  new Date(formData.end_date) <
  new Date(formData.start_date)
) {
  setError(
    "End date cannot be before start date."
  );
  toast.error("End date cannot be before start date.");
  return;
}

    setLoading(true);

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.post(
          "/events",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      const message =
  response.data.message ||
  "Event Created Successfully";

setSuccess(message);
toast.success(message);

setFormData({
  title: "",
  description: "",
  category: "",
  location: "",
  start_date: "",
  end_date: "",
  max_participants: ""
});

setTimeout(() => {
  navigate("/events");
}, 2000);

    } catch (err) {

      const message =
  err.response?.data?.message ||
  "Failed to create event.";

setError(message);
toast.error(message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <Layout>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create New Event
        </h1>

        {success && (
          <div className="mb-4 rounded border border-green-300 bg-green-100 p-3 text-green-700">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-100 p-3 text-red-700">
            ❌ {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block font-medium mb-1">
              Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block font-medium mb-1">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              placeholder="Enter event description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block font-medium mb-1">
              Category
            </label>
            <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
>

  <option value="">
    Select Category
  </option>

  <option value="Hackathon">
    Hackathon
  </option>

  <option value="Workshop">
    Workshop
  </option>

  <option value="Seminar">
    Seminar
  </option>

  <option value="Sports">
    Sports
  </option>

  <option value="Cultural">
    Cultural
  </option>

</select>
            {/* <input
              type="text"
              name="category"
              placeholder="Hackathon / Workshop / Seminar"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}

          </div>

          <div>

            <label className="block font-medium mb-1">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block font-medium mb-1">
              Start Date
            </label>

            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block font-medium mb-1">
              End Date
            </label>

            <input
              type="datetime-local"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block font-medium mb-1">
              Maximum Participants
            </label>

            <input
              type="number"
              min="1"
              name="max_participants"
              placeholder="Enter maximum participants"
              value={formData.max_participants}
              onChange={handleChange}
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded py-3 font-semibold text-white transition ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>

        </form>

      </div>

    </Layout>

  );

};

export default CreateEvent;