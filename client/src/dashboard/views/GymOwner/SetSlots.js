import React, { Component } from "react";
import DatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "reactstrap";
import axios from "axios";
import moment from "moment-timezone";
import timezones from "../../../user/timezones";
import {connect} from 'react-redux'



moment.tz.setDefault("Asia/Kolkata");


class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTimezone = this.onChangeTimezone.bind(this);
    this.getSlots = this.getSlots.bind(this);
    this.onGetSlot = this.onGetSlot.bind(this);
    this.onSlotSelect = this.onSlotSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      date: new Date(),
      timezones: timezones,
      timezone: "",
      slots: [],
      slots_booked:[],
      buttons: [],
      gymList:[],
      all_slots:[]
    };
  }
  
  componentDidMount() {
    //console.log(new Date().toTimeString().split(" ")[0])
    this.setState({
      date: new Date(),
      timezone: "Asia/Kolkata",
    });
  }

  componentDidUpdate(prevProps, prevState) {
      
    if(this.props.userState.user && this.state.gymList.length==0){

      axios.get("http://localhost:5000/gymList/").then((res)=> {
        //console.log('res: ', res);

        for (var i in res.data){
            if(res.data[i].email== this.props.userState.user.email){
            this.setGymList(res.data[i])
            break
            }
          }
          //console.log('gymList: ', this.state.gymList);
      });
    }
  }

  onChangeTimezone(e) {
    this.setState({
      timezone: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
      slots_booked:[]
    })
    if (this.state.gymList.slots)
    this.state.gymList.slots.map((eachDate) =>  Number(Object.keys(eachDate)) == date.getDate() ?
    this.setState({
      slots_booked: eachDate[Object.keys(eachDate)]
    })
    :null)

    this.onGetSlot()
  }

  setGymList(gymList) {
    this.setState({
      gymList: gymList,
      all_slots: gymList.slots
    });
  }

  getSlots(availableSlots) {
    let refSlots = [];
    //console.log('availableSlots: ', availableSlots);

    availableSlots.map((slot) => {
       //console.log('slot1: ',new Date(slot))
      let booked=0;

      for (var i=0; i <  this.state.slots_booked.length; i++){
        if (new Date(slot).getHours()== new Date(this.state.slots_booked[i]).getHours())
          booked=1
      }

      if(this.state.date.getDate() === (moment.tz(slot , this.state.timezone)).date()){
        
        if(new Date().getHours() < (moment.tz(slot , this.state.timezone)).hours()){
        
          refSlots.push({slot_available: moment.tz(slot, this.state.timezone), booked: booked});
        
          }
      }
      else{
        refSlots.push({slot_available: moment.tz(slot, this.state.timezone), booked: booked});
      }

      return moment.tz(slot, this.state.timezone);
    });

    this.setState({
      slots: refSlots
    });
    
    let tmp = [];
    this.state.slots.map((slot) => {
      let cur_hr = new Date().getHours()
      let Hours = slot.slot_available.hours();
      let min = slot.slot_available.minutes();
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
        tmp.push({tmp: `${_hrs}:${_min} ${_daynight}`, booked: slot.booked});
        return tmp;
      // }
      
    });
    this.setState({
      buttons: tmp
    });
  }

  onGetSlot() {
    const events = {
      reqDate: this.state.date.valueOf(),
      reqTimezone: this.state.timezone,
    };

    axios.post("http://localhost:5000/freeSlots", events).then((res) => {
      this.getSlots(res.data);
    });
  }


  onSlotSelect(e) {

      let refSlots = [];
      this.state.slots.map((slot) => {
        refSlots.push(moment.tz(slot.slot_available, "Asia/Kolkata"));
        return moment.tz(slot, "Asia/Kolkata");
      });
      e.button.booked=1;

      //let index = this.state.buttons.tmp.indexOf(e.button.tmp);
      let index=0

      for (var j=0; j< this.state.buttons.length; j++){
          if (this.state.buttons[j].tmp== e.button.tmp){
            index= j;
            break
          }
        }

      const selectedSlot = refSlots[index];
      
      //console.log('selectedSlot: ',selectedSlot);
      
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
      
      if(!(this.state.slots_booked.includes(eventDateTime))){
      this.setState(prevState => ({
          slots_booked: [...prevState.slots_booked, eventDateTime]
        }))
      }
      
        //console.log('this.state.slots_booked: ', this.state.slots_booked);
    }
  
  onSubmit(){

    if(window.confirm("Are you sure you want to continue?")){

    let final_slots={}
    final_slots[Number(this.state.date.getDate())]= this.state.slots_booked

    let arr= this.state.all_slots

    arr = arr.filter(item => Number(Object.keys(item)[0]) !== this.state.date.getDate())
    arr.push(final_slots)

    
    this.setState({
        all_slots: arr
      })

      const eventParam = {
        slots_changed: arr,
        email: this.props.userState.user.email,
      };

      //console.log('eventParam: ', eventParam);
    
    axios.post("http://localhost:5000/gym_register", eventParam).then((res) => {
      console.log(res.data);
      window.location.reload()
      });
    }
  }

  render() {
    // console.log(this.props.userState.user.email)

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
                    maxDate= {new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+27)}
                  />
                </div>
              </div>
              <div className="form-group">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary"
            />
          </div>
            </form>
          </div>
          <div className="col-12 col-md-6">
            {this.state.buttons.map((button) => {
              return (
                <Button
                  key = {button.tmp}
                  style={{width : "120px" , height : "auto"}}
                  color={button.booked==1 ? 'success' : "primary"}
                  className="m-2"
                  onClick={() => {
                    this.onSlotSelect({ button });
                  }}
                >
                  {button.tmp}
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