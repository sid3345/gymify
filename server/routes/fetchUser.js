const router = require("express").Router();
const db = require("../db");


router.route("/").post((req, res) => {
//   console.log(req.body.email)
//   res.send(req.body);

  email = req.body.email
  let user = [] 

  email ?
  db.collection("users")
    .where("email" , "==" , email)
    .get()
    .then((snapshot) =>{
        snapshot.docs.forEach((doc) => {
            user.push(doc.data())
          })
        console.log("Fetch",user)
        res.json(user);   
    })
    :
    db.collection("users")
    .get()
    .then((snapshot) =>{
        snapshot.docs.forEach((doc) => {
            user.push(doc.data())
          })
        // console.log(user)
        res.json(user);   
    })
  
});

module.exports = router;
