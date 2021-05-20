const router = require("express").Router();
const admin = require("firebase-admin");

const db = require("../db");
const staticConfig = require("../staticConfig");

const moment = require("moment-timezone");
moment.tz.setDefault(staticConfig.timezone);

router.route("/").post((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("New slot added");
  
  const reqDateTime = moment.utc(req.body.reqDateTime).toDate();
  const reqDuration = parseInt(req.body.reqDuration);
  const reqUserEmail = req.body.userEmail
  const reqGymName = req.body.gymName
  const reqGymEmail = req.body.gymEmail
  const reqCost = req.body.cost
  console.log(reqGymName)

  db.collection("events").add({
    dateTime: admin.firestore.Timestamp.fromDate(reqDateTime),
    duration: reqDuration,
    userEmail: reqUserEmail,
    gymName: reqGymName,
    gymEmail : reqGymEmail,
    cost : reqCost


  });
});

module.exports = router;
