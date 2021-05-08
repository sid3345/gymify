const router = require("express").Router();
const db = require("../db");

router.route("/").post((req, res) => {

  let gymList = [];

  //console.log('req.body.gymEmail: ',req.body.gymEmail);

  req.body.gymEmail ?

  db.collection("gyms")
  .where("email", "==", req.body.gymEmail)  
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
    :
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
