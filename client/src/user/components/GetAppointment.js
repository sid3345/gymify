import React, { Component } from "react";
import DatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "reactstrap";
import axios from "axios";
import moment from "moment-timezone";
import timezones from "../timezones";
import {connect} from 'react-redux'



moment.tz.setDefault("Asia/Kolkata");


class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTimezone = this.onChangeTimezone.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.getSlots = this.getSlots.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSlotSelect = this.onSlotSelect.bind(this);

    this.state = {
      date: new Date(),
      timezones: timezones,
      timezone: "",
      duration: 0,
      slots: [],
      buttons: [],
    };
  }
  
  componentDidMount() {
    console.log(new Date().toTimeString().split(" ")[0])
    this.setState({
      date: new Date(),
      timezone: "Asia/Kolkata",
      duration: 30,
    });
  }

  onChangeTimezone(e) {
    this.setState({
      timezone: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  getSlots(availableSlots) {
    let refSlots = [];
    availableSlots.map((slot) => {
      // console.log((moment.tz(slot , this.state.timezone)).date())
      // console.log(this.state.date.getDate())
      if(this.state.date.getDate() === (moment.tz(slot , this.state.timezone)).date()){
        
        if(new Date().getHours() < (moment.tz(slot , this.state.timezone)).hours()){
        
          refSlots.push(moment.tz(slot, this.state.timezone));
        
          }

      }
      else{
        refSlots.push(moment.tz(slot, this.state.timezone));

      }

      
      return moment.tz(slot, this.state.timezone);
    });
    this.setState({
      slots: refSlots,
    });
    let tmp = [];
    this.state.slots.map((slot) => {
      // console.log(new Date().getHours())
      let cur_hr = new Date().getHours()
      let Hours = slot.hours();
      let min = slot.minutes();
      let _hrs = Hours;
      let _daynight = "AM";
      // if(cur_hr < Hours){
        if (Hours > 12) {
          _hrs = Hours - 12;
          _daynight = "PM";
        } else if (Hours === 12) {
          _hrs = 12;
          _daynight = "PM";
        }
        let _min = min;
        if (min === 0) _min = "00";
        tmp.push(`${_hrs}:${_min} ${_daynight}`);
        return tmp;
      // }
      
    });
    this.setState({
      buttons: tmp,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const events = {
      reqDate: this.state.date.valueOf(),
      reqTimezone: this.state.timezone,
    };

    axios.post("http://localhost:5000/freeSlots", events).then((res) => {
      this.getSlots(res.data);
    });
  }

  onSlotSelect(e) {
    if(window.confirm("Are You Sure wanna continue?")){
      let refSlots = [];
      this.state.slots.map((slot) => {
        refSlots.push(moment.tz(slot, "Asia/Kolkata"));
        return moment.tz(slot, "Asia/Kolkata");
      });
      let index = this.state.buttons.indexOf(e.button);
      const selectedSlot = refSlots[index];
      let date = this.state.date,
        yr = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        hr = moment(selectedSlot).hours(),
        min = moment(selectedSlot).minutes();

      // let eventDateTime = new Date(yr, month, day, hr, min, 0);
      let eventDateTime = moment
        .tz([yr, month, day, hr, min], "Asia/Kolkata")
        .format();
      // console.log(eventDateTime);

      const eventParam = {
        reqDateTime: eventDateTime,
        reqDuration: this.state.duration,
        userEmail: this.props.userState.user.email,
        gymName : this.props.gymName,
        gymEmail : this.props.gymEmail
      };

    if(this.props.userState.wallet > parseInt(this.props.priceOnPayment)){
      axios
        .post("http://localhost:5000/createEvent", eventParam)
        .then(() => {
          axios
            .post("http://localhost:5000/updateWallet", {wallet : parseInt(this.props.userState.wallet - parseInt(this.props.priceOnPayment)) , email : this.props.userState.user.email , action : "book"})
            .then((res) =>{
              console.log(res.data)
              window.location = `/status/${eventParam.reqDateTime}/${eventParam.reqDuration}`;

            })
        })
        .catch(() => {
          window.location = `/Error/:442`;
        });
    }
    else{
      alert("You Don't have enough balance!")
    }
    } 
  }

  render() {
    console.log(this.props.priceOnPayment)
    console.log(typeof parseInt(this.props.priceOnPayment))
    // console.log(this.props.userState.user.email)
    console.log(this.props.gymName)
    console.log(typeof this.props.userState.wallet)


    return (
      <div>
        <div className="row px-3">
          <div className="col-12 col-md-6">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label> Date:</label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    minDate={moment().toDate()}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label> Duration</label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Get Slots"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
          <div className="col-12 col-md-6">
            {this.state.buttons.map((button) => {
              return (
                <Button
                  key = {button}
                  style={{width : "120px" , height : "auto"}}
                  color="primary"
                  className="m-2"
                  onClick={() => {
                    this.onSlotSelect({ button });
                  }}
                >
                  {button}
                </Button>
              );
            })}
    
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    userState : state
  }
}

export default connect(mapStateToProps)(CreateEvent)