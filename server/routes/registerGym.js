const router = require("express").Router();
const admin = require("firebase-admin");

const db = require("../db");

router.route("/").post((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("Gym added");

  console.log('req.body received: ',req.body);

  db.collection("gyms").doc(req.body.email).set({
   gym : req.body.gym,
   email : req.body.email,
   name : req.body.name,
   propertyGovt : req.body.propertyGovt,
   cost : req.body.cost,
   city : req.body.city,
   address : req.body.address,
   postal : req.body.postal,
   description : req.body.description,
   approved: req.body.approved
  });
});

module.exports = router;
