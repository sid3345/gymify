const router = require("express").Router();
const admin = require("firebase-admin");

const db = require("../db");

router.route("/").post((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("Gym added");

  console.log('Gym register req: ',req.body);

  req.body.slots_changed ?
  db.collection("gyms").doc(req.body.email).update({
   slots: req.body.slots_changed,
  })
  :
  db.collection("gyms").doc(req.body.email).set({
   gym : req.body.gym,
   email : req.body.email,
   name : req.body.name ? req.body.name : ' ',
   propertyGovt : req.body.propertyGovt ? req.body.propertyGovt: ' ',
   cost : req.body.cost ? req.body.cost : ' ',
   city : req.body.city ? req.body.city : ' ',
   address : req.body.address ? req.body.address : ' ',
   postal : req.body.postal ? req.body.postal : ' ',
   description : req.body.description ? req.body.description : ' ',
   approved: req.body.approved,
   slots: req.body.slots,
   img: req.body.img
  });
});

module.exports = router;
