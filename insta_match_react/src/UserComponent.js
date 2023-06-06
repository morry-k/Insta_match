import React, { useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import db from './firebase';
import getUserData from './InstagramAPI';

function UserComponent({ access_token }) {
  useEffect(() => {
    async function fetchAndSaveUserData() {
      try {
        const response = await getUserData(access_token);

        console.log(response); // 追加

        const userData = response.data;

        // Add a new document with a generated id.
        await addDoc(collection(db, "users"), userData);
        
        console.log("Document successfully written!");
      } catch (error) {
        //console.log(access_token);
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
    
    if (access_token) {  // access_tokenがnull以外のときだけAPIリクエストを行う
      fetchAndSaveUserData();
    }
  }, [access_token]);

  return (
    <div>
      {/* Your component layout here */}
    </div>
  );
}

export default UserComponent;