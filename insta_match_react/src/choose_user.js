import React, { useState } from "react";

// ユーザーが特定のusernameをデータベースに登録できるようにする
// 対象のinstagramページの表示と、確認を伴う

const ChooseUser = () => {
    const [username, setUsername] = useState("");
    const [confirmed, setConfirmed] = useState(false);
  
    const handleChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleConfirm = (event) => {
      event.preventDefault();
      window.open(`https://www.instagram.com/${username}`, '_blank'); // ユーザーが"ユーザーを確認"ボタンを押したときに新しいタブでInstagramのページを開く
      setConfirmed(true);
    };
  
    const handleYes = () => {
      window.localStorage.setItem('chosenUsername', username); // ユーザーが"はい"を選んだときにユーザーネームをlocalStorageに保存
      setConfirmed(false);
    };
  
    const handleNo = () => {
      setUsername(""); // ユーザーが"いいえ"を選んだときにユーザーネームをリセット
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