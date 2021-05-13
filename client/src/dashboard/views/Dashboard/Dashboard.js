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
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const[gymList, setGymList]= useState('');
  const[userList, setUserList]= useState('');
  const[eventList, setEventList]= useState('');
  const[revenue, setRevenue]= useState('')
  const[listOfGym, setlistOfGym]= useState([]);

  var total

  useEffect(() => {
  axios.get("http://localhost:5000/gymList/").then((res)=> {
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
    }
  },[eventList, revenue])

 
  useEffect(() => {
    var listGym=[]

    if(gymList){
     
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
              <h3 className={classes.cardTitle}>{revenue}</h3>
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
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
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
                Top booked gyms
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Name","Gym Email" ,"Revenue",'Bookings', "City"]}
                tableData={listOfGym}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
