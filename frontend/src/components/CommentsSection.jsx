import { useEffect, useState } from "react";
import api from "../services/api";

const CommentsSection = ({ eventId }) => {

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {

    try {

      const response =
        await api.get(
          `/comments/event/${eventId}`
        );

      setComments(
        response.data.comments
      );

    } catch (error) {

      console.log(error);

    }

  };

  const addComment = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/comments",
        {
          event_id: eventId,
          comment
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setComment("");

      fetchComments();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteComment = async (commentId) => {

  try {

    const token =
      localStorage.getItem("token");

    await api.delete(
      `/comments/${commentId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchComments();

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Comments
      </h2>

      <textarea
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Add comment..."
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={addComment}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Comment
      </button>

      <div className="mt-6">

        {comments.map((item) => (

          <div
            key={item.id}
            className="border p-3 rounded mb-3"
          >

            <p>{item.comment}</p>

<p className="text-sm text-gray-500">
  {item.name}
</p>

<button
  onClick={() => deleteComment(item.id)}
  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
>
  Delete
</button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default CommentsSection;