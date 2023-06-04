/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// functions/index.js
const functions = require("firebase-functions");
const axios = require("axios");

exports.getInstagramAccessToken =
functions.https.onRequest(async (req, res) => {
  const {code} = req.query;

  try {
    const response = await axios.post("https://api.instagram.com/oauth/access_token", {
      client_id: functions.config().instagram.client_id,
      client_secret: functions.config().instagram.client_secret,
      grant_type: "authorization_code",
      redirect_uri: functions.config().instagram.redirect_uri,
      code,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error getting access token", error);
    res.status(500).json({error: "Error getting access token"});
  }
});
