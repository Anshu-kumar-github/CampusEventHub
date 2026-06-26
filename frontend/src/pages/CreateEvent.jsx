// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Layout from "../components/Layout";
// import api from "../services/api";

// const CreateEvent = () => {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
    
//     title: "",
//     description: "",
//     category: "",
//     location: "",
//     start_date: "",
//     end_date: "",
//     max_participants: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });

//   };

//   const handleSubmit = async (e) => {

//   e.preventDefault();

//   if (!formData.title.trim()) {
//     alert("Title is required");
//     return;
//   }

//   if (!formData.description.trim()) {
//     alert("Description is required");
//     return;
//   }

//   if (!formData.category.trim()) {
//     alert("Category is required");
//     return;
//   }

//   if (!formData.location.trim()) {
//     alert("Location is required");
//     return;
//   }

//   if (!formData.start_date) {
//     alert("Start Date is required");
//     return;
//   }

//   if (!formData.end_date) {
//     alert("End Date is required");
//     return;
//   }

//   if (!formData.max_participants) {
//     alert("Maximum Participants is required");
//     return;
//   }

//   if (Number(formData.max_participants) <= 0) {
//     alert("Maximum Participants must be greater than 0");
//     return;
//   }

//   setLoading(true);

//   try {

//     const token =
//       localStorage.getItem("token");

//     const response =
//       await api.post(
//         "/events",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//     setSuccess(
//   response.data.message ||
//   "Event Created Successfully"
// );

// setTimeout(() => {
//   navigate("/events");
// }, 2000);

//   } catch (error) {

//     alert(
//       error.response?.data?.message ||
//       "Failed to create event"
//     );

//   } finally {

//     setLoading(false);

//   }

// };
//   return (

//     <Layout>

//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">

//         <h1 className="text-3xl font-bold mb-6">
//           Create New Event
//         </h1>

//         {success && (
//   <div className="bg-green-100 text-green-700 border border-green-300 p-3 rounded mb-4">
//     ✅ {success}
//   </div>
// )}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//         >

//           <div>

//             <label className="block mb-1 font-medium">
//               Title
//             </label>

//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />

//           </div>

//           <div>

//             <label className="block mb-1 font-medium">
//               Description
//             </label>

//             <textarea
//               rows="4"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />

//           </div>

//           <div>

//             <label className="block mb-1 font-medium">
//               Category
//             </label>

//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />

//           </div>

//           <div>

//             <label className="block mb-1 font-medium">
//               Location
//             </label>

//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />

//           </div>

//           <div>

//             <label className="block mb-1 font-medium">
//               Start Date
//             </label>

//             <input
//               type="datetime-local"
//               name="start_date"
//               value={formData.start_date}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />

//           </div>

//           <div>

//             <label className="block mb-1 font-medium">
//               End Date
//             </label>

//             <input
//               type="datetime-local"
//               name="end_date"
//               value={formData.end_date}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />

//           </div>

//           <div>

//             <label className="block mb-1 font-medium">
//               Maximum Participants
//             </label>

//             <input
//               type="number"
//               name="max_participants"
//               value={formData.max_participants}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             />

//           </div>

//           <button
//   type="submit"
//   disabled={loading}
//   className={`w-full py-2 rounded text-white ${
//     loading
//       ? "bg-gray-400 cursor-not-allowed"
//       : "bg-blue-600 hover:bg-blue-700"
//   }`}
// >
//   {loading ? "Creating..." : "Create Event"}
// </button>

//         </form>

//       </div>

//     </Layout>

//   );

// };

// export default CreateEvent;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

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
      setError("Title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.start_date) {
      setError("Start Date is required.");
      return;
    }

    if (!formData.end_date) {
      setError("End Date is required.");
      return;
    }

    if (!formData.max_participants) {
      setError("Maximum Participants is required.");
      return;
    }

    if (Number(formData.max_participants) <= 0) {
      setError("Maximum Participants must be greater than 0.");
      return;
    }
    if (
  new Date(formData.end_date) <
  new Date(formData.start_date)
) {
  setError(
    "End date cannot be before start date."
  );
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

      setSuccess(
  response.data.message ||
  "Event Created Successfully"
);

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

      setError(
        err.response?.data?.message ||
        "Failed to create event."
      );

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