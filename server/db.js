const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

//console.log('serviceAccount: ',serviceAccount);

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
