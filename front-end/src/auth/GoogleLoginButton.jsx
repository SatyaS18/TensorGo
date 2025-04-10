import React from "react";
import {jwtDecode} from "jwt-decode";
import axios from 'axios'
import {GoogleLogin} from '@react-oauth/google'
const GoogleLoginButton = ({ onLoginSuccess }) => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const decoded = jwtDecode(idToken);
      console.log("Google User:", decoded);
      console.log("Sending token to backend:", idToken);

      const res = await axios.post("http://localhost:5000/api/auth/google", {
        idToken,
      });

      console.log("Login API Response:", res); 

      const { token, user } = res.data;
      console.log("Token:", token);
      console.log("User from backend:", user);

      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user); 
    } catch (error) {
      console.error("Login failed:");
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  return <GoogleLogin onSuccess={handleSuccess} onError={()=> console.log('login failed')}/>
};

export default GoogleLoginButton;
