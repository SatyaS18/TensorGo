const axios = require("axios");

exports.submitToFrill = async ({ category, rating, comment, user }) => {
  const apiKey = process.env.FRILL_API_KEY;
  const payload = {
    title: `${category} Feedback`,
    body: `Rating: ${rating}/5\n\nComment: ${comment}`,
    author: user.name,
    email: user.email,
  };

  const response = await axios.post("https://api.frill.co/v1/ideas", payload, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
