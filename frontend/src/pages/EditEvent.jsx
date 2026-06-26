import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

const EditEvent = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

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
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

  const fetchEvent = async () => {

    try {

      const response =
  await api.get(`/events/${id}`);

const eventData = response.data.event;

setEvent(eventData);

setFormData({
  title: eventData.title,
  description: eventData.description,
  category: eventData.category,
  location: eventData.location,
  start_date: eventData.start_date
    ? eventData.start_date.slice(0, 16)
    : "",
  end_date: eventData.end_date
    ? eventData.end_date.slice(0, 16)
    : "",
  max_participants: eventData.max_participants
});
    } catch (error) {

  console.error(error);

  toast.error(
    error.response?.data?.message ||
    "Failed to load event."
  );

}

  };

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
    const message = "Category is required.";
    setError(message);
    toast.error(message);
    return;
  }

  if (!formData.location.trim()) {
    const message = "Location is required.";
    setError(message);
    toast.error(message);
    return;
  }

  if (!formData.start_date) {
    const message = "Start Date is required.";
    setError(message);
    toast.error(message);
    return;
  }

  if (!formData.end_date) {
    const message = "End Date is required.";
    setError(message);
    toast.error(message);
    return;
  }

  if (!formData.max_participants) {
    const message = "Maximum Participants is required.";
    setError(message);
    toast.error(message);
    return;
  }

  if (Number(formData.max_participants) <= 0) {
    const message = "Maximum Participants must be greater than 0.";
    setError(message);
    toast.error(message);
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

    const token = localStorage.getItem("token");

    const response = await api.put(
      `/events/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const message =
  response.data.message ||
  "Event Updated Successfully";

setSuccess(message);
toast.success(message);

    setTimeout(() => {
      navigate("/events");
    }, 2000);

  } catch (err) {

    const message =
  err.response?.data?.message ||
  "Failed to update event.";

setError(message);
toast.error(message);

  } finally {

    setLoading(false);

  }

};

  if (!event) {
    return (
      <Layout>
        <p className="text-center text-gray-500">
  Loading event details...
</p>
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
        Edit Event
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
  {loading ? "Updating..." : "Update Event"}
</button>

        </form>

    </Layout>

  );

};

export default EditEvent;