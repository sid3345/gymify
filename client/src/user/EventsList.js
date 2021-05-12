import React, { Component } from "react";
// import {  } from "reactstrap";
import Calendar from "react-calendar";
import axios from "axios";
import { Table } from "reactstrap";
import moment from "moment-timezone";
import {connect} from 'react-redux'


moment.tz.setDefault("Asia/Kolkata");



class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.getEventsList = this.getEventsList.bind(this);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.setState({
      events: []
    });
  }


  getEventsList(eventsList) {
    this.setState({
      events: eventsList,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const range = {
      userEmail: this.props.uservalue.user.email
    };

    axios.post("http://localhost:5000/getEvents/", range).then((res) => {
      console.log(res.data)
      this.getEventsList(res.data);
    });
  }
  render() {
    
    return (
      <div className="container">
        <form className="range-selector row mt-5" onSubmit={this.onSubmit}>
          <div className="col-12 d-flex justify-content-center align-items-center">
            <input
              type="submit"
              value="Get all bookings"
              className="btn btn-primary mt-5"
            />
          </div>
        </form>
        <Table className="container mt-5" striped>
          <thead>
            <tr>
              <th>Gym Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map((e) => {
              let date = moment(e.dateTime).format("dddd, MMMM Do YYYY");
              let time = moment(e.dateTime).format("hh:mm A");
              return (
                <tr>
                  <td>{e.gymName}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{e.duration} Minutes</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}


const mapStateToProps = (state) =>{
  return{
    uservalue : state
  }
}

export default connect(mapStateToProps)(CreateEvent)