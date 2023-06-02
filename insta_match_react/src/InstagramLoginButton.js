import React from 'react';

const InstagramLoginButton = () => {
    const instagramLogin = () => {
        const clientId = 'your-instagram-app-id';
        const redirectUri = 'your-redirect-url';
        const scope = 'user_profile,user_media';

        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;

        window.open(authUrl, '_blank');
    };

    return (
        <button onClick={instagramLogin}>Instagramでログイン</button>
    );
};

export default InstagramLoginButton;