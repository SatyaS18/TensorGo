// FeedbackForm.jsx (modern, visually enhanced)
import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ user, setFeedback }) => {
  const [category, setCategory] = useState("Product Features");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", {
        category,
        rating,
        comment,
        user,
      });
      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedback(res.data);
      setComment("");
      setRating(5);
      setCategory("Product Features");
    } catch (err) {
      console.error("Feedback submission error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 border border-gray-700"
    >
      <h2 className="text-xl font-semibold text-blue-400">Submit Feedback</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Product Features</option>
          <option>Product Pricing</option>
          <option>Product Usability</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Write your feedback here..."
          className="w-full bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 text-white rounded-md shadow-md transition"
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
