const router = require("express").Router();
const db = require("../db");
const staticConfig = require("../staticConfig");
const moment = require("moment-timezone");
moment.tz.setDefault(staticConfig.timezone);

router.route("/").post((req, res) => {
  reqStart = moment(req.body.reqStart)
    .set({ hour: 0, minute: 0, second: 0 })
    // .tz(staticConfig.timezone)
    .toDate();
  reqEnd = moment(req.body.reqEnd)
    .set({ hour: 23, minute: 59, second: 59 })
    // .tz(staticConfig.timezone)
    .toDate();
  reqUserEmail = req.body.userEmail
  reqGymEmail = req.body.gymEmail
  console.log(req.body)
  console.log(reqStart);
  console.log(reqEnd);
  console.log(reqUserEmail)
  let eventsList = [];

  reqUserEmail ?

  db.collection("events")
    .where("userEmail", "==", reqUserEmail)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        eventsList.push(doc.data());
      });
      eventsList.map((event) => {
        event.dateTime = event.dateTime.toDate();
        event.dateTime = moment
          .tz(event.dateTime, staticConfig.timezone)
          .format();
      });
      res.json(eventsList);
    })
    :
    reqGymEmail ?

    db.collection("events")
    .where("gymEmail", "==", reqGymEmail)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        eventsList.push(doc.data());
      });
      eventsList.map((event) => {
        event.dateTime = event.dateTime.toDate();
        event.dateTime = moment
          .tz(event.dateTime, staticConfig.timezone)
          .format();
      });
      res.json(eventsList);
    })
    :
    db.collection("events")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        eventsList.push(doc.data());
      });
      eventsList.map((event) => {
        event.dateTime = event.dateTime.toDate();
        event.dateTime = moment
          .tz(event.dateTime, staticConfig.timezone)
          .format();
      });
      res.json(eventsList);
    });
});

module.exports = router;
