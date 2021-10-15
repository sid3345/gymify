import React, {useState, useEffect, useRef} from "react";

/* global google */

// @material-ui/core components
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
import { useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

// core components
import GridItem from "../../dashboard/components/Grid/GridItem";
import GridContainer from "../../dashboard/components/Grid/GridContainer.js";
import CustomInput from "../../dashboard/components/CustomInput/CustomInput.js";
import Button from "../../dashboard/components/CustomButtons/Button.js";
import Card from "../../dashboard/components/Card/Card.js";
import CardHeader from "../../dashboard/components/Card/CardHeader.js";
// import CardAvatar from "../../dashboard/components/Card/CardAvatar.js";
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

function UserProfile(props) {

  const classes = useStyles();

  const history = useHistory()

  const [readOnly , setReadOnly] = useState(true)

  const userData = JSON.parse(localStorage.getItem('userData'))

  console.log(userData)
  
  const [name , setName] = useState(userData.name)
  const [weight , setCost] = useState(userData.weight)
  const [email , setEmail] = useState(userData.email)
  const [Body_type , setBodyType] = useState(userData.Body_type)
  const [MobileNumber , setMobileNum] = useState(userData.MobileNumber)
  const [city , setCity] = useState(userData.city)
  const [address , setAddress] = useState(userData.address)
  const [postal , setPostal] = useState(userData.postal)
  const [description , setDescription] = useState(userData.description)
  // const [googleMapLink , setGoogleMapLink] = useState('')

  // var autocomplete = null

    const onSubmit= (e) => {
    e.preventDefault();

    const data= {
      'name':name,
      'email':email,
      'Body_type':Body_type,
      'MobileNumber':MobileNumber,
      'weight':weight,
      'city':city,
      'address':address,
      'postal':postal,
      'description':description,
    }

    console.log('data submitted: ', data);

    axios.post("http://localhost:5000/updateUser/", data).then((res) => {
      console.log(res.data);
      res.data && localStorage.setItem('userData' , JSON.stringify(data))

    });
    setReadOnly(!readOnly)

    // history.push('/')
    
  }

  //  useEffect(() => {

  // autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {})

  // autocomplete.addListener("place_changed", handlePlaceSelect)

  // console.log('autocomplete: ', autocomplete);

  // },[])

  // const handlePlaceSelect = ()=> {
  //   let addressObject = autocomplete.getPlace()
  //   let address = addressObject.address_components
    
  //   setAddress(addressObject.name)
  //   setCity(address[4].long_name)
  //   setPostal(address[8].short_name)
  //   setGoogleMapLink(addressObject.url)
  // }


  return (
    <div>
    <br></br><br></br>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Your Profile</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: name,
                      readOnly : readOnly,
                    onChange: e => setName(e.target.value)
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
                      disabled: true
                    }}
                    inputProps={{
                      required: true,
                      value: email,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Weight"
                    id="weight"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: weight,
                      readOnly : readOnly,
                    onChange: e => setCost(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Body Type"
                    id="Body_type"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: Body_type,
                      readOnly : readOnly,
                    onChange: e => setBodyType(e.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Mobile number"
                    id="MobileNumber"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: MobileNumber,
                      readOnly : readOnly,
                    onChange: e => setMobileNum(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
               <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    useRef="input"
                    labelText="address"
                    id="address"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: address,
                      readOnly : readOnly,
                    onChange: e => setAddress(e.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: city,
                      readOnly : readOnly,
                    onChange: e => setCity(e.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      required: true,
                      value: postal,
                      readOnly : readOnly,
                    onChange: e => setPostal(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {/* <InputLabel style={{ color: "#AAAAAA" }}>Description</InputLabel> */}
                  <CustomInput
                    labelText="About me"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      value: description,
                      readOnly : readOnly,
                    onChange: e => setDescription(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
            {(name && Body_type && email && MobileNumber && weight && city && address && postal) ? 
              <Button onClick={onSubmit} color="primary">Submit</Button>
              : 
              <Button disabled color="primary">Submit</Button>}

              <Button color="primary" onClick = {e => setReadOnly(!readOnly)}>{readOnly ? 'Edit' : 'Cancel'}</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}


const mapStateToProps = (state) =>{
  return{
    uservalue : state
  }
}

export default connect(mapStateToProps)(UserProfile)