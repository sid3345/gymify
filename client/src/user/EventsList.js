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
    this.getEventsList = this.getEventsList.bind(this);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const email = {
      userEmail: this.props.uservalue.user.email
    };

    axios.post("http://localhost:5000/getEvents/", email).then((res) => {
      console.log(res.data)
      this.getEventsList(res.data);
    });
  }


  getEventsList(eventsList) {
    this.setState({
      events: eventsList,
    });
  }


  render() {
    
    return (
      <div className="container">
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