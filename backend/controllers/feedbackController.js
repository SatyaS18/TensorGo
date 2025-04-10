// const { submitToFrill } = require("../services/frillService");
// exports.submitToFrill = async (req, res) => {
//   try {
//     const { category, rating, comment, user } = req.body;
//     if (!category || !rating || !comment || !user) {
//       return res.status(400).json({ error: "Missing fields" });
//     }
//     console.log("Feedback received:", { category, rating, comment, user });
//     const result = await submitToFrill({ category, rating, comment, user });
//   } catch (error) {
//     console.error("Feedback error", error.message);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { category, rating, comment, user } = req.body;

    if (!category || !rating || !comment || !user) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const feedback = new Feedback({ category, rating, comment, user });
    await feedback.save();

    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback error", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbackList);
  } catch (error) {
    console.error("Fetch feedback error:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

exports.deleteFeedback = async (req, res) => {
  const { id } = req.params;
  const userEmail = req.body.user.email;

  const feedback = await Feedback.findById(id);
  if (!feedback) return res.status(404).json({ error: "Feedback not found" });

  if (feedback.user.email !== userEmail)
    return res.status(403).json({ error: "Unauthorized" });

  await feedback.deleteOne();
  res.status(200).json({ message: "Feedback deleted" });
};

exports.updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { comment, rating, user } = req.body;

  const feedback = await Feedback.findById(id);
  if (!feedback) return res.status(404).json({ error: "Feedback not found" });

  if (feedback.user.email !== user.email)
    return res.status(403).json({ error: "Unauthorized" });

  feedback.comment = comment;
  feedback.rating = rating;
  await feedback.save();

  res.status(200).json({ message: "Feedback updated", feedback });
};