import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
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
    
  axios.post("http://localhost:5000/gymList/", gymEmail).then((res)=> {
    console.log('res: ', res.data);
    console.log('res.gym: ', (res.data)[0].gym);
    console.log('res.name: ', (res.data)[0].name);

    setGym((res.data)[0].gym);
    setName((res.data)[0].name);
    setEmail((res.data)[0].email);
    setCost((res.data)[0].cost);
    setPropertyGovt((res.data)[0].propertyGovt);
    setCity((res.data)[0].city);
    setAddress((res.data)[0].address);
    setPostal((res.data)[0].postal);
    setDescription((res.data)[0].description);

    });
  },[])

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
      'description':description
    }

    axios.post("http://localhost:5000/gym_register/", data).then((res) => {
      console.log(res.data);
    });
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
                    value={gym}
                    onChange = {e => setGym(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    value={email}
                    onChange = {e => setEmail(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Cost per hour"
                    id="cost"
                    value={cost}
                    onChange = {e => setCost(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Owner Name"
                    id="name"
                    value={name}
                    onChange = {e => setName(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Gym property govt registration"
                    id="gym-registration"
                    value={propertyGovt}
                    onChange = {e => setPropertyGovt(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    value={city}
                    onChange = {e => setCity(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Address"
                    id="address"
                    value={address}
                    onChange = {e => setAddress(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    value={postal}
                    onChange = {e => setPostal(e.target.value)}
                    formControlProps={{
                      fullWidth: true
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
                    value={description}
                    onChange = {e => setDescription(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={onSubmit} color="primary">Approve</Button>
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
