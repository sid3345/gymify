const router = require("express").Router();
const admin = require("firebase-admin");

const db = require("../db");

router.route("/").post((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(req.body);
  console.log(req.body)
  db.collection("users").add({
    email : req.body.email,
    checked : req.body.check.checked
  })

});

module.exports = router;
