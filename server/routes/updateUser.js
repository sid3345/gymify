const router = require("express").Router();
const admin = require("firebase-admin");

const db = require("../db");

router.route("/").post((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("Gym added");

  console.log('user req: ',req.body);

  db.collection("users").doc(req.body.email).update({
   name : req.body.name,
   email : req.body.email,
   Body_type : req.body.Body_type ? req.body.Body_type : ' ',
   MobileNumber : req.body.MobileNumber ? req.body.MobileNumber: ' ',
   weight : req.body.weight ? req.body.weight : ' ',
   city : req.body.city ? req.body.city : ' ',
   address : req.body.address ? req.body.address : ' ',
   postal : req.body.postal ? req.body.postal : ' ',
   description : req.body.description ? req.body.description : ' ',
  //  approved: req.body.approved,
  //  slots: req.body.slots,
//    img: req.body.img
  });
});

module.exports = router;
