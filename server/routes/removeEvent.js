const router = require("express").Router();
const db = require("../db");
const staticConfig = require("../staticConfig");
const moment = require("moment-timezone");
moment.tz.setDefault(staticConfig.timezone);

router.route("/").post((req, res) => {
    // console.log((req.body)[0].userEmail)
    // console.log(typeof new Date((req.body)[0].dateTime))
  var delEvent =  db.collection('events')
    .where("dateTime" , "==" , new Date((req.body)[0].dateTime))
    .where("gymEmail" , "==" , (req.body)[0].gymEmail)
    .where("userEmail" , "==" , (req.body)[0].userEmail)
    .limit(1)

    delEvent.get()
    .then(function(querySnapshot) {
        
      querySnapshot.forEach(function(doc) {
        
        doc.ref.delete();
        res.send(req.body)

      });
    });
        

})

module.exports = router;


