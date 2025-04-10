import React, { useState } from "react";
import axios from "axios";

const FeedbackDisplay = ({ feedback, setFeedback, user }) => {
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const filteredFeedback =
    filter === "All"
      ? feedback
      : feedback.filter((fb) => fb.category === filter);

  const startEditing = (fb) => {
    setEditing(fb._id);
    setEditComment(fb.comment);
    setEditRating(fb.rating);
  };

  const handleEditSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/feedback/${id}`, {
        comment: editComment,
        rating: editRating,
        user,
      });

      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedback(res.data);
      setEditing(null);
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`, {
        data: { user },
      });

      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedback(res.data);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">Filter by Category:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option>All</option>
          <option>Product Features</option>
          <option>Product Pricing</option>
          <option>Product Usability</option>
        </select>
      </div>

      <ul className="space-y-6">
        {filteredFeedback.map((fb) => (
          <li key={fb._id} className="p-4 rounded bg-gray-800 shadow-md">
            {editing === fb._id ? (
              <>
                <p className="font-semibold">
                  {fb.user.name} ({fb.category})
                </p>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                  className="w-full p-2 my-2 rounded bg-gray-700 text-white"
                />
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSave(fb._id)}
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="font-semibold">
                  {fb.user.name} ({fb.category})
                </p>
                <p className="text-yellow-400">⭐ Rating: {fb.rating}/5</p>
                <p className="my-2">{fb.comment}</p>
                <small className="text-gray-400">
                  {new Date(fb.createdAt).toLocaleString()}
                </small>

                {fb.user.email === user.email && (
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleDelete(fb._id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => startEditing(fb)}
                      className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackDisplay;
