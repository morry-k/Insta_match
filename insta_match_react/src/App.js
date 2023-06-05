
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

      console.log(code); // の結果正しいコードが格納されていた

      
    
      // Call the Firebase Cloud Function and get the access token
      try {

        const url = `https://us-central1-fir-login-dc885.cloudfunctions.net/getInstagramAccessToken?code=${code}`;
        console.log("this is url");
        console.log(url);

        //const response = await axios.get('https://us-central1-fir-login-dc885.cloudfunctions.net/');

        
        const response = await axios.get(
          `https://us-central1-fir-login-dc885.cloudfunctions.net/getInstagramAccessToken?code=${code}`
          // `https://us-central1-your-firebase-project-id.cloudfunctions.net
          // asia-northeast1
          // 関数名とプロジェクトIDを入力している regionも変える
        );
        
        console.log("This is response")
        console.log(response);

        // Save the access token in the state
        setAccessToken(response.data.access_token);

      } catch (error) {
        console.error("Error getting access token", error);

        console.log("fail");
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
