const express = require("express");
const router = express.Router();
const { submitFeedback, getAllFeedback, deleteFeedback, updateFeedback } = require("../controllers/feedbackController");

router.post("/", submitFeedback);
router.get("/", getAllFeedback);
router.delete("/:id", deleteFeedback);
router.put("/:id", updateFeedback);

module.exports = router;
