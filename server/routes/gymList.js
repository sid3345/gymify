const router = require("express").Router();
const db = require("../db");

router.route("/").post((req, res) => {

  console.log("email :" ,req.body)

  email = req.body.email

  let gymList = [];

  email ?
  db.collection("gyms")
  .where("email" , "==" , email)
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
