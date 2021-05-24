import React, {useEffect, useState} from "react";
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

import {connect} from 'react-redux'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

const UserTableList= (props)=> {
  const classes = useStyles();

  const [userList, setUserList] = useState()

  const listUser=[]

  useEffect(() => {
    if(props.uservalue.user){
    const email = {
      gymEmail: props.uservalue.user.email
    };

      axios.post("http://localhost:5000/getEvents/", email).then((res) => {
      //console.log('res.data: ',res.data)
      setUserList(res.data);
    });
  }
  },[props.uservalue.user])

  if (userList){
    //console.log('userList: ',userList);  
    userList.map(user=>{
    //console.log('user: ',user)

    let Hours = new Date(user.dateTime).getHours();
    let min = new Date(user.dateTime).getMinutes();
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

    let dateTime= new Date(user.dateTime).getDate()+'-'+new Date(user.dateTime).getMonth()+'-'+new Date(user.dateTime).getFullYear()+' '+ _hrs +':'+_min+ ' '+ _daynight

    listUser.push([user.userEmail, dateTime, user.cost])
  })
  }

  //console.log('userList: ', userList);
  //console.log('listUser: ',listUser);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Users</h4>
            <p className={classes.cardCategoryWhite}>
              List of users that booked the slots
            </p>
          </CardHeader>
          <CardBody>
          <Table
            link= ''
            tableHeaderColor="primary"
            tableHead={["User Email", 'Date Time booked', 'Amount']}
            tableData={listUser}
          />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

const mapStateToProps = (state) =>{
  return{
    uservalue : state
  }
}

export default connect(mapStateToProps)(UserTableList)