const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const getSlotsRouter = require("./routes/freeSlots");
const getEventsRouter = require("./routes/gymList");
const createEventsRouter = require("./routes/createEvent");
const registerGym = require("./routes/registerGym");
const gymList = require("./routes/gymList");

app.use("/freeSlots", getSlotsRouter);
app.use("/getEvents", getEventsRouter);
app.use("/createEvent", createEventsRouter);
app.use("/gym_register", registerGym);
app.use("/gymList", gymList);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
