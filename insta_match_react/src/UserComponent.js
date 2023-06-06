import React, { useState, useEffect } from 'react';
import { collection, addDoc, setDoc, doc, getDocs, query, where } from "firebase/firestore";
import db from './firebase';
import getUserData from './InstagramAPI';

function UserComponent({ access_token }) {
  const [userData, setUserData] = useState(JSON.parse(window.localStorage.getItem('userData'))); // ユーザーデータをローカルストレージから読み込む

  useEffect(() => {
    async function fetchAndSaveUserData() {
      if (access_token) {
        try {
          const response = await getUserData(access_token);

          console.log(response);

          const userData = response.data;

          // Add a new document with a generated id.
          //await addDoc(collection(db, "users"), userData);

          // Set the document with the Instagram user's ID
          await setDoc(doc(db, 'users', userData.id), userData);

          
          console.log("Document successfully written!");

          // ユーザーデータをセット
          setUserData(userData);
          // ユーザーデータをローカルストレージに保存
          window.localStorage.setItem('userData', JSON.stringify(userData));

        } catch (error) {
          console.error("Error writing document: ", error);
          // エラーハンドリングを強化
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            console.error('Request:', error.request);
          } else {
            console.error('Error', error.message);
          }
        }
      }
    }
    
    fetchAndSaveUserData();
  }, [access_token]);

  return (
    <div>
      {/* Display the user ID and username if we have the user data */}
      {userData ? (
        <>
          <p>User ID: {userData.id}</p>
          <p>Username: {userData.username}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserComponent;
