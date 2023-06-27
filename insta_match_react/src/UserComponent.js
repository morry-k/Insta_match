import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "./firebase";
import getUserData from "./InstagramAPI";
import axios from "axios";

function UserComponent({ access_token }) {
  const [userData, setUserData] = useState(
    JSON.parse(window.localStorage.getItem("userData"))
  ); // ユーザーデータをローカルストレージから読み込む

  const [userMedia, setUserMedia] = useState([]);

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
          await setDoc(doc(db, "users", userData.id), userData);

          console.log("Document successfully written!");

          // ユーザーデータをセット
          setUserData(userData);
          // ユーザーデータをローカルストレージに保存
          window.localStorage.setItem("userData", JSON.stringify(userData));

          // Get user media data
          const mediaResponse = await axios.get(
            `https://graph.instagram.com/me/media?fields=id,caption&access_token=${access_token}`
          );
          let mediaData = mediaResponse.data.data;

          // Get each media object's detailed data
          mediaData = await Promise.all(
            mediaData.map(async (media) => {
              const detailResponse = await axios.get(
                `https://graph.instagram.com/${media.id}?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${access_token}`
              );
              return detailResponse.data;
            })
          );

          setUserMedia(mediaData);
        } catch (error) {
          console.error("Error writing document: ", error);
          // エラーハンドリングを強化
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Request:", error.request);
          } else {
            console.error("Error", error.message);
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

          {/* Display user media data if we have it */}
          {userMedia.length > 0 ? (
            userMedia.map((media, index) => (
              <div key={index}>
                {media.media_type === "IMAGE" && (
                  <img src={media.media_url} alt={media.caption} />
                )}
                {media.media_type === "VIDEO" && (
                  <video controls src={media.media_url} />
                )}
                <p>{media.caption}</p>
              </div>
            ))
          ) : (
            <p>Loading user media data...</p>
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserComponent;
