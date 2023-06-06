import './App.css';
import UserComponent from './UserComponent';
import InstagramLoginButton from './InstagramLoginButton';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getAccessToken = async () => {
      // Get the authentication code from the URL
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code");

      console.log(code);

      // Call the Firebase Cloud Function and get the access token
      try {
        const response = await axios.post(
          'https://us-central1-fir-login-dc885.cloudfunctions.net/getInstagramAccessToken', 
          { data: { code: code } },
          { headers: { 'Content-Type': 'application/json' } },
        );
      
        console.log(response.data.result.access_token);  
        // Save the access token in the state
        setAccessToken(response.data.result.access_token);
      } catch (error) {
        console.error("Error getting access token", error);
      }
    };

    getAccessToken();
  }, [location]);

  return (
    <div className="App">
      <h1>Insta match</h1>
      <UserComponent access_token={accessToken} />
      <InstagramLoginButton />

      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>Loading...</p>
      )}
      
    </div>
  );
}

export default App;
