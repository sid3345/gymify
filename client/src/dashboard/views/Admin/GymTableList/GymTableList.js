import React, {useEffect, useState} from "react";
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Table from "../../../components/Table/Table.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";

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

export default function GymTableList() {
  const classes = useStyles();

  const [gymList, setGymList] = useState()

  const listGym=[]

  useEffect(() => {
    axios.post("http://localhost:5000/gymList/").then((res)=> {
      //console.log('res: ', res);
      
      setGymList(res.data)
      });
  },[])

  if (gymList){
    console.log('gymList: ',gymList);  
    gymList.map(gym=>{
    //console.log('gym: ',gym)
    gym.approved==1 ? gym.approved='Yes' : gym.approved='No'
    listGym.push([gym.gym, gym.email, gym.propertyGovt, gym.cost, gym.city, gym.approved])})
  }

  //console.log('gymList: ', gymList);
  //console.log('listGym: ',listGym);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Gyms / Sports Clubs</h4>
            <p className={classes.cardCategoryWhite}>
              Approve gym to register
            </p>
          </CardHeader>
          <CardBody>
          <Table
            link= '/admin/user/'
            tableHeaderColor="primary"
            tableHead={["Name","Gym Email" ,"Property registration",'Cost per hr', "City",'Approve']}
            tableData={listGym}
          />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
