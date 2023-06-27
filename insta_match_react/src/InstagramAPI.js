// InstagramAPI.js
import axios from 'axios';

const baseURL = "https://graph.instagram.com/";

export default function getUserData(access_token) {
  return axios.get(`${baseURL}me?fields=id,username,media&access_token=${access_token}`);
}