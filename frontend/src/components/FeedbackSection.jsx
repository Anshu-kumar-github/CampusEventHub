import { useEffect, useState } from "react";
import api from "../services/api";

const FeedbackSection = ({ eventId }) => {

  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {

    try {

      const response =
        await api.get(
          `/feedback/event/${eventId}`
        );

      setFeedback(
        response.data.feedback
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/feedback",
        {
          event_id: eventId,
          rating,
          comments
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setComments("");
      setRating(5);

      fetchFeedback();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Feedback
      </h2>

      <select
        value={rating}
        onChange={(e) =>
          setRating(e.target.value)
        }
        className="border p-2 mb-3"
      >
        <option value="1">1 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="5">5 ⭐</option>
      </select>

      <textarea
        value={comments}
        onChange={(e) =>
          setComments(e.target.value)
        }
        placeholder="Write feedback..."
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Feedback
      </button>

      <div className="mt-6">

        {feedback.map((item, index) => (

          <div
            key={index}
            className="border p-3 rounded mb-3"
          >

            <p>
              {"⭐".repeat(item.rating)}
            </p>

            <p>{item.comments}</p>

            <p className="text-sm text-gray-500">
              {item.name}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default FeedbackSection;