// ユーザーが特定のusernameをデータベースに登録できるようにする
// 対象のinstagramページの表示と、確認を伴う

import React, { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import db from "./firebase";

const ChooseUser = ({ access_token }) => {
  const [username, setUsername] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(window.localStorage.getItem("userData")));

  useEffect(() => {
    if(access_token) {
      setUserData(JSON.parse(window.localStorage.getItem("userData")));
    }
  }, [access_token]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    window.open(`https://www.instagram.com/${username}`, '_blank'); // Open Instagram page in a new tab
    setConfirmed(true);
  };

  const handleYes = async () => {
    // Save chosenUsername to localStorage
    window.localStorage.setItem('chosenUsername', username);

    // Save the chosenUsername to the current user's document in Firestore
    if (userData) {
      const userDoc = doc(db, 'users', userData.id);
      await setDoc(userDoc, { chosenUsername: username }, { merge: true });
    }

    setUsername("");
    setConfirmed(false);
  };

  const handleNo = () => {
    setUsername("");
    setConfirmed(false);
  };

  return (
    <div>
      <form onSubmit={handleConfirm}>
        <input type="text" value={username} onChange={handleChange} placeholder="Enter username" />
        <button type="submit">ユーザーを確認</button>
      </form>
      {confirmed && (
        <div>
          <p>このユーザーでよいですか？</p>
          <button onClick={handleYes}>はい</button>
          <button onClick={handleNo}>いいえ</button>
        </div>
      )}
    </div>
  );
};

export default ChooseUser;
