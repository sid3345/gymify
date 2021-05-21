import React, { Component } from "react";
import { Button } from 'reactstrap'
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
      // console.log(res.data)
      this.getEventsList(res.data);
    });
  }


  getEventsList(eventsList) {
    this.setState({
      events: eventsList,
    });
  }

  removeBooking(id){

    if(window.confirm("Are You Sure Wanna Cancel Your Booking? You Will Refunded with 80 percent of actual cost.")){
      const arrayCopy = this.state.events.filter((row) => this.state.events.indexOf(row) + 1 == id)
      const arrayCopyTwo = this.state.events.filter((row) => this.state.events.indexOf(row) + 1 !== id)
      console.log("one:" , arrayCopy)
      console.log("two",arrayCopyTwo)
  
      
      axios.post("http://localhost:5000/removeEvent/", arrayCopy)
      .then((res) => {this.setState({events : arrayCopyTwo}) 
              console.log(res.data)
              axios.post("http://localhost:5000/updateWallet", {wallet : parseInt(this.props.uservalue.wallet + parseInt(((res.data)[0].cost)*80)/100) , email : this.props.uservalue.user.email , action : "update"})
              .then(window.location.reload())
    })
    }
    
   
    
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
                <tr key = {this.state.events.indexOf(e) + 1}>
                  <td>{e.gymName}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{e.duration} Minutes</td>
                  <td><Button outline color="danger" onClick = {() =>this.removeBooking(this.state.events.indexOf(e) + 1)}>Cancel</Button></td>
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