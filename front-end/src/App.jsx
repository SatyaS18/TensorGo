import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./auth/GoogleLoginButton";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackDisplay from "./components/FeedbackDisplay";
import Layout from "./Layout";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5000/api/feedback")
        .then((res) => setFeedback(res.data))
        .catch((err) => console.error("Feedback fetch error:", err));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Layout user={user} onLogout={handleLogout}>
        {!user ? (
          <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <div className="bg-white/5 p-10 rounded-lg backdrop-blur-md shadow-xl max-w-md w-full text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Login to{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Submit Feedback
                </span>
              </h1>
              <p className="text-gray-300 mb-6">
                Welcome to the TensorGo feedback portal
              </p>
              <div className="flex justify-center">
                <GoogleLoginButton onLoginSuccess={setUser} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
            <div className="lg:w-1/3">
              <FeedbackForm user={user} setFeedback={setFeedback} />
            </div>

            <div className="lg:w-2/3">
              <FeedbackDisplay
                feedback={feedback}
                setFeedback={setFeedback}
                user={user}
              />
            </div>
          </div>
        )}
      </Layout>
    </GoogleOAuthProvider>
  );
}

export default App;
