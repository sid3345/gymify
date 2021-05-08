import React, {useState} from "react";
// @material-ui/core components
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory} from 'react-router-dom'

// core components
import GridItem from "../../dashboard/components/Grid/GridItem";
import GridContainer from "../../dashboard/components/Grid/GridContainer.js";
import CustomInput from "../../dashboard/components/CustomInput/CustomInput.js";
import Button from "../../dashboard/components/CustomButtons/Button.js";
import Card from "../../dashboard/components/Card/Card.js";
import CardHeader from "../../dashboard/components/Card/CardHeader.js";
import CardAvatar from "../../dashboard/components/Card/CardAvatar.js";
import CardBody from "../../dashboard/components/Card/CardBody.js";
import CardFooter from "../../dashboard/components/Card/CardFooter.js";

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

export default function GymRegister() {
  const classes = useStyles();

  const history = useHistory()
  
  const [gym , setGym] = useState('')
  const [cost , setCost] = useState('')
  const [email , setEmail] = useState('')
  const [name , setName] = useState('')
  const [propertyGovt , setPropertyGovt] = useState('')
  const [city , setCity] = useState('')
  const [country , setCountry] = useState('')
  const [postal , setPostal] = useState('')
  const [description , setDescription] = useState('')

  const onSubmit= (e) => {
    e.preventDefault();

    const data= {
      'gym':gym,
      'email':email,
      'name':name,
      'propertyGovt':propertyGovt,
      'cost':cost,
      'city':city,
      'country':country,
      'postal':postal,
      'description':description
    }

    axios.post("http://localhost:5000/gym_register/", data).then((res) => {
      console.log(res.data);
      alert('Gym profile submitted. Wait for sometime to approve.')
      history.push('/')
    });
  }

  return (
    <div>
    <br></br><br></br>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Register Gym</h4>
              <p className={classes.cardCategoryWhite}>Fill in your Gym Profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Gym / Club name"
                    id="gym"
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
                    onChange = {e => setCity(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    onChange = {e => setCountry(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
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
                    labelText="Fill any description detail if needed"
                    id="about-me"
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
              <Button onClick={onSubmit} color="primary">Submit</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
