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

const functions = require("firebase-functions");
// const cors = require("cors");
const axios = require("axios");
const qs = require("qs");

/*
const corsHandler = cors({
  origin: true,
});
*/

exports.getInstagramAccessToken = functions.https.onCall(
    async (data, context) => {
      const {code} = data;

      const params = {
        client_id: functions.config().instagram.client_id,
        client_secret: functions.config().instagram.client_secret,
        grant_type: "authorization_code",
        redirect_uri: functions.config().instagram.redirect_uri,
        code,
      };

      console.log("Instagram Config:", params);

      // Move code inside the cors middleware
      try {
        const response = await axios.post(
            "https://api.instagram.com/oauth/access_token",
            qs.stringify(params),
            {
              headers: {
                "content-type":
                "application/x-www-form-urlencoded;charset=utf-8",
              },
            },
        );

        return response.data;
      } catch (error) {
        console.error("Error getting access token", error.response.data);
        throw new functions.https.HttpsError(
            "internal",
            "Error getting access token",
        );
      }
    },
);
