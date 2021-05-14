const router = require("express").Router();
const admin = require("firebase-admin");

const db = require("../db");

router.route("/").post((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(req.body);
  console.log(req.body)
  db.collection("users").doc(req.body.email).set({
    email : req.body.email,
    checked : req.body.check.checked,
    wallet : 0
  })

});

module.exports = router;
