import React, {useState, useEffect} from "react";
import axios from 'axios';
import moment from "moment-timezone";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import TouchAppIcon from '@material-ui/icons/TouchApp';

// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Table from "../../../components/Table/Table.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardIcon from "../../../components/Card/CardIcon.js";
import CardBody from "../../../components/Card/CardBody.js";
//import CardFooter from "../../../../components/Card/CardFooter.js";
import CardFooter from "../../../components/Card/CardFooter";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../../variables/charts.js";

import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

moment.tz.setDefault("Asia/Kolkata");

export default function Dashboard() {
  const classes = useStyles();

  const[gymList, setGymList]= useState('');
  const[userList, setUserList]= useState('');
  const[eventList, setEventList]= useState('');
  const[revenue, setRevenue]= useState(0)
  const[listOfGym, setlistOfGym]= useState([]);
  const[countDayofWeek, setCountDayofWeek]= useState([]);
  const[countMonthofYear, setCountMonthofYear]= useState([]);
  const[countHoursofDay, setCountHoursofDay]= useState([]);

  useEffect(() => {
  axios.post("http://localhost:5000/gymList/").then((res)=> {
    //console.log('res: ', res);
    setGymList(res.data)
    });

    axios.post("http://localhost:5000/fetchUser/").then((res)=> {
    //console.log('res: ', res);
    
    setUserList(res.data)
    });

    const range = {
      reqStart: moment.tz(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), "Asia/Kolkata").toDate(),
      reqEnd: moment.tz(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), "Asia/Kolkata").toDate(),
    };

    axios.post("http://localhost:5000/getEvents/", range).then((res) => {
      //console.log('event data: ' ,res.data)
      setEventList(res.data)
      })
  },[])


  useEffect(() => {
    var total=0

    if(gymList && eventList){

      let gymList_copy = JSON.parse(JSON.stringify(gymList))
      let eventList_copy = JSON.parse(JSON.stringify(eventList))

        gymList_copy.map((gyms)=>{
        gyms.gymRevenue=0
        gyms.bookings=0

        eventList_copy.map((events)=>{
        
          if(events.gymEmail==gyms.email){
            //console.log('matched: ',gymList[j].email, eventList[i].gymEmail)
              total += parseInt(gyms.cost)

              gyms.gymRevenue+=parseInt(gyms.cost) 
              gyms.bookings+=1
            }
          })
      })
      //console.log('gymList_copy inside: ', gymList_copy);
      //console.log('total: ', total);

      setGymList(gymList_copy)
      setRevenue(total)

      var countDay={}
      var countmonth= {}
      var countHours={}

      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

      countDay["Sunday"]=0
      countDay["Monday"]=0
      countDay["Tuesday"]=0
      countDay["Wednesday"]=0
      countDay["Thursday"]=0
      countDay["Friday"]=0
      countDay["Saturday"]=0

      countmonth['January']=0
      countmonth['February']=0
      countmonth['March']=0
      countmonth['April']=0
      countmonth['May']=0
      countmonth['June']=0
      countmonth['July']=0
      countmonth['August']=0
      countmonth['September']=0
      countmonth['October']=0
      countmonth['November']=0
      countmonth['December']=0

      countHours['6AM']=0
      countHours['7AM']=0
      countHours['8AM']=0
      countHours['9AM']=0
      countHours['10AM']=0
      countHours['11AM']=0
      countHours['12PM']=0
      countHours['1PM']=0
      countHours['2PM']=0
      countHours['3PM']=0
      countHours['4PM']=0
      countHours['5PM']=0
      countHours['6PM']=0
      countHours['7PM']=0
      countHours['8PM']=0
      countHours['9PM']=0
      countHours['10PM']=0

    eventList.map((events)=>{
      //console.log('event: ',event);

      let hr= new Date(events.dateTime).getHours();
      let _hrs = hr
      let _daynight = "AM";
      if (hr > 12) {
        _hrs = hr - 12;
        _daynight = "PM";
      } else if (hr === 12) {
        _hrs = 12;
        _daynight = "PM";
      }

      var day = days[ new Date(events.dateTime).getDay() ];
      var month = months[ new Date(events.dateTime).getMonth() ];

      countDay[day]+= 1
      countmonth[month] += 1
      countHours[_hrs+_daynight]+=1
      })

      var listDay=[]
      var listMonth=[]
      var listHours=[]

      for(var i in countDay)
        listDay.push(countDay[i]);

      for(var i in countmonth)
        listMonth.push(countmonth[i]);

      for(var i in countHours)
        listHours.push(countHours[i]);

      setCountDayofWeek({'labels':['S', "M", "T", "W", "T", "F", "S"], 'series':[listDay]})
      setCountMonthofYear({'labels':[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ], 'series':[listMonth]})

    setCountHoursofDay({'labels':['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM'],
        'series':[listHours]})

      //console.log(countDay);
      //console.log(countmonth);
      //console.log(('countHours: ',countHours));
    }
  },[eventList, revenue])
 
  useEffect(() => {
    var listGym=[]

    if(gymList){

      gymList.sort((a, b) => b.bookings - a.bookings);
     
      gymList.map(gyms=>{
        listGym.push([gyms.gym, gyms.email, gyms.gymRevenue, gyms.bookings, gyms.city])
      })
    } 
    setlistOfGym(listGym)

  },[gymList])

  //console.log('gymList: ', gymList);
  //console.log('listOfGym: ', listOfGym);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>₹ {revenue}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                From this month to next 3 months
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <TouchAppIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Number of Bookings</p>
              <h3 className={classes.cardTitle}>{eventList.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                From this month to next 3 months
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="warning">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Users Count</p>
              <h3 className={classes.cardTitle}>{userList.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
         <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <FitnessCenterIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Gym Count</p>
              <h3 className={classes.cardTitle}>{gymList.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={countDayofWeek}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Bookings</h4>
              <p className={classes.cardCategory}>
                Daily Performance
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Last 30 days
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} >
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={countMonthofYear}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Monthly Bookings</h4>
              <p className={classes.cardCategory}>Booking Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Year
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={countHoursofDay}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Hourly Booking Stats</h4>
              <p className={classes.cardCategory}>Hourly Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Gym Stats</h4>
              <p className={classes.cardCategoryWhite}>
                Top 5 most booked gyms
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Name","Gym Email" ,"Revenue",'Bookings', "City"]}
                tableData={listOfGym.slice(0, 5)}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
