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
    this.getSlots = this.getSlots.bind(this);
    this.onSlotSelect = this.onSlotSelect.bind(this);

    this.state = {
      date: new Date(),
      timezones: timezones,
      timezone: "",
      slots: [],
      buttons: [],
      all_slots: [],
    };
  }
  
  componentDidMount() {
    //console.log(new Date().toTimeString().split(" ")[0])
    this.setState({
      date: new Date(),
      timezone: "Asia/Kolkata",
    });

    axios.post("http://localhost:5000/gymList/" , {email : this.props.gymEmail}).then((res)=> {
        console.log('res: ', res);

        if(res.data[0].email== this.props.gymEmail){
          this.setState({
            all_slots: res.data[0].slots
          });
        }
      });
  }

  onChangeTimezone(e) {
    this.setState({
      timezone: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
    let flag=0;

    this.state.all_slots.map((eachDate) =>  Number(Object.keys(eachDate)) == date.getDate() ?
    flag=(eachDate[Object.keys(eachDate)]).filter(curr => moment(curr).format("YYYY/MM/DD") == moment(date).format("YYYY/MM/DD"))
    :null)

    console.log("flag" , flag)

    if (flag==0)
     return this.getSlots([])
    else
     return this.getSlots(flag)

  }

  getSlots(availableSlots) {
    //console.log('availableSlots: ', availableSlots);

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
    //console.log('refSlots: ', refSlots);
    this.setState({
      slots: refSlots,
    });
    let tmp = [];
    refSlots.map((slot) => {
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

  onSlotSelect(e) {
    if(window.confirm("Are You Sure wanna continue?")){
      let refSlots = [];
      this.state.slots.map((slot) => {
        refSlots.push(moment.tz(slot, "Asia/Kolkata"));
        return moment.tz(slot, "Asia/Kolkata");
      });
      let index=0

      for (var j=0; j< this.state.buttons.length; j++){
          if (this.state.buttons[j]== e.button){
            index= j;
            break
          }
        }

      const selectedSlot = refSlots[index];
      //console.log('selectedSlot: ', selectedSlot);

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
        userEmail: this.props.userState.user.email,
        gymName : this.props.gymName,
        gymEmail : this.props.gymEmail,
        cost : parseInt(this.props.priceOnPayment)
      };

      

    if(this.props.userState.wallet > parseInt(this.props.priceOnPayment)){
      axios
        .post("http://localhost:5000/createEvent", eventParam)
        .then(() => {
          axios
            .post("http://localhost:5000/updateWallet", {wallet : parseInt(this.props.userState.wallet - parseInt(this.props.priceOnPayment)) , email : this.props.userState.user.email , action : "book"})
            .then((res) =>{
              console.log(res.data)
              window.location = `/status/${eventParam.reqDateTime}`;

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
    
    // console.log(this.props.userState.user.email)

    return (
      <div>
        <div className="row px-3">
          <div className="col-12 col-md-6">
            <form>
              <div className="form-group">
                <label> Date:</label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    minDate={moment().toDate()}
                    maxDate= {new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+27)}
                  />
                </div>
              </div>
            </form>
            </div>
          <div className="col-12 col-md-6">
            {this.state.buttons.length > 0 ? this.state.buttons.map((button) => {
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
            }) : <h2> No Slot Available </h2>}
    
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