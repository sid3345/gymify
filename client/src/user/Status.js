import React from "react";
import moment from "moment-timezone";
import { Switch, Route, useParams } from "react-router-dom";

const Success = () => {
  return (
    <div>
      <Switch>
        <Route
          path="/status/:dateTime"
          children={<BookingStatus />}
        />
      </Switch>
    </div>
  );
};

const BookingStatus = () => {
  let { dateTime } = useParams();
  let date = moment(dateTime).format("dddd, MMMM Do YYYY");
  let time = moment(dateTime).format("hh:mm A");
  return (
    <div
      className="statusMessage"
      style={{ width: "700px", margin: "100px auto" }}
    >
      <h3>Your slot is successfully booked</h3>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <a href="/">Back to Home</a>
    </div>
  );
};
export default Success;
