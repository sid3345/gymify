import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { useHistory} from 'react-router-dom'

// @material-ui/core components
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import avatar from "../../assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const history = useHistory()

  let { gym_email } = useParams();

  const gymEmail= {gymEmail: gym_email}

  //console.log('gymEmail: ',gymEmail);

  const [gym , setGym] = useState('')
  const [cost , setCost] = useState('')
  const [email , setEmail] = useState('')
  const [name , setName] = useState('')
  const [propertyGovt , setPropertyGovt] = useState('')
  const [city , setCity] = useState('')
  const [address , setAddress] = useState('')
  const [postal , setPostal] = useState('')
  const [description , setDescription] = useState('')


  useEffect(() => {
    
  axios.get("http://localhost:5000/gymList/").then((res)=> {
    //console.log('res: ', res.data);

    for(let i=0; i<res.data.length;i++){
      

      if ((res.data)[i].email==gym_email)
      {
        //console.log('(res.data)[i]: ',(res.data)[i]);

        setGym((res.data)[i].gym);
        setName((res.data)[i].name);
        setEmail((res.data)[i].email);
        setCost((res.data)[i].cost);
        setPropertyGovt((res.data)[i].propertyGovt);
        setCity((res.data)[i].city);
        setAddress((res.data)[i].address);
        setPostal((res.data)[i].postal);
        setDescription((res.data)[i].description);
        break
      }
    }
    });
  },[])

  const onDelete= (e)=>{
     e.preventDefault();

    const data= {
      'email':email,
    }

    axios.post("http://localhost:5000/gym_delete/", data).then((res) => {
      console.log(res.data);
    });

    history.push('/admin/gymList')
  }

  const onSubmit= (e) => {
    e.preventDefault();

    const data= {
      'gym':gym,
      'email':email,
      'name':name,
      'propertyGovt':propertyGovt,
      'cost':cost,
      'city':city,
      'address':address,
      'postal':postal,
      'description':description,
      'approved': 1
    }

    console.log('data submitted: ', data);

    axios.post("http://localhost:5000/gym_register/", data).then((res) => {
      console.log(res.data);
    });

    history.push('/admin/gymList')
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Check Gym Profile</h4>
              <p className={classes.cardCategoryWhite}>Modify or Approve</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Gym / Club name"
                    id="gym"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: gym,
                    onChange: e => setGym(e.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: email,
                      onChange: e => setEmail(e.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Cost per hour"
                    id="cost"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      required: true,
                      value: cost,
                      onChange: e => setCost(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Owner Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      required: true,
                      value: name,
                      onChange: e => setName(e.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Gym property govt registration"
                    id="gym-registration"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      required: true,
                      value: propertyGovt,
                      onChange: e => setPropertyGovt(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      required: true,
                      value: city,
                      onChange: e => setCity(e.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Address"
                    id="address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      required: true,
                      value: address,
                      onChange: e => setAddress(e.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      required: true,
                      value: postal,
                      onChange: e => setPostal(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Description</InputLabel>
                  <CustomInput
                    labelText="Check data and approve to register gym"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      required: true,
                      value: description,
                      onChange: e => setDescription(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={onSubmit} color="primary">Approve</Button>

              <Button onClick={onDelete} color="primary">Delete</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" >
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Owner</h6>
              <h4 className={classes.cardTitle}>{name}</h4>
              <p className={classes.description}>
                Gym Owner Description
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
