import React from 'react';

const InstagramLoginButton = () => {
    const instagramLogin = () => {
        // 以下の情報は重要なので本番環境では環境変数から読み取るようにする
        const clientId = '646645220169839'; // instagram app ID
        const redirectUri = 'https://localhost:3000/'; //redirect uri
        const scope = 'user_profile,user_media';

        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;

        // Remove the access token from the local storage
        localStorage.removeItem('access_token');
        
        window.location.href = authUrl; // 現在のタブでInstagramのログインページに移動
    };

    return (
        <button onClick={instagramLogin}>Instagramでログイン</button>
    );
};

export default InstagramLoginButton;
