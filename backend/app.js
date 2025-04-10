const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API working...");
});
module.exports = app;
