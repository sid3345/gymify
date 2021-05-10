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
   name : req.body.name.length>0 ? req.body.name : ' ',
   propertyGovt : req.body.propertyGovt.length>0 ? req.body.propertyGovt: ' ',
   cost : req.body.cost.length>0 ? req.body.cost : ' ',
   city : req.body.city.length>0 ? req.body.city : ' ',
   address : req.body.address.length>0 ? req.body.address : ' ',
   postal : req.body.postal.length>0 ? req.body.postal : ' ',
   description : req.body.description.length>0 ? req.body.description : ' ',
   approved: req.body.approved,
   img: req.body.img
  });
});

module.exports = router;
