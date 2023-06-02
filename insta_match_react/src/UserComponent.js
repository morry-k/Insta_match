import React, { useEffect } from 'react';
import { collection, doc, setDoc } from "firebase/firestore";
import db from './firebase';
import getUserData from './InstagramAPI';

function UserComponent({ access_token }) {
  useEffect(() => {
    async function fetchAndSaveUserData() {
      try {
        const response = await getUserData(access_token);
        const userData = response.data;
        const docRef = doc(collection(db, "users"), "user_id");
        await setDoc(docRef, userData);
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
    fetchAndSaveUserData();
  }, [access_token]);

  return (
    <div>
      {/* Your component layout here */}
    </div>
  );
}

export default UserComponent;