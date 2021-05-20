const router = require("express").Router();
const admin = require("firebase-admin");

const db = require("../db");

router.route("/").post((req, res) => {


  console.log("wallet" , req.body)
  wallet = req.body.wallet
  res.send(req.body)

  req.body.action  || req.body.update ?

  db.collection("users").doc(req.body.email).update({
    "wallet": wallet ,
  }) : 

  db.collection("users").doc(req.body.email).update({
    "wallet": wallet + 500,
  })
  
});

module.exports = router;
