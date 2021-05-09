const router = require("express").Router();
const db = require("../db");

router.route("/").get((req, res) => {

  let gymList = [];

  db.collection("gyms")
  .get()
    .then((snapshot) => {
     snapshot.docs.forEach((doc) => {
        gymList.push(doc.data());
      });
      //console.log('gymList server: ', gymList);

      res.json(gymList);
    })
    .catch(function(err) {
        console.error("Failed to get JSON from DB", err);
      })
});

module.exports = router;
