const router = require("express").Router();
const admin = require("firebase-admin");

const db = require("../db");

router.route("/").post((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("Gym Deleted");

  db.collection('gyms').doc(req.body.email).delete();

  db.collection('users').doc(req.body.email).delete();
});

module.exports = router;
