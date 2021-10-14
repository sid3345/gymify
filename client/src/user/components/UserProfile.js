import React, {useState, useEffect, useRef} from "react";

/* global google */

// @material-ui/core components
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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

  console.log(props.uservalue.user && props.uservalue.user.email)

  const classes = useStyles();

  const history = useHistory()

  const [readOnly , setReadOnly] = useState(true)
  
  const [name , setName] = useState('')
  const [weight , setCost] = useState('')
  // const [email , setEmail] = useState('')   //controlling from redux
  const [Body_type , setBodyType] = useState('')
  const [MobileNumber , setMobileNum] = useState('')
  const [city , setCity] = useState('')
  const [address , setAddress] = useState('')
  const [postal , setPostal] = useState('')
  const [description , setDescription] = useState('')
  const [googleMapLink , setGoogleMapLink] = useState('')

  var autocomplete = null

    const onSubmit= (e) => {
    e.preventDefault();

    const data= {
      'name':name,
      'email':props.uservalue.user.email,
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
    });
    alert('Gym profile submitted. Wait for sometime to approve.')

    history.push('/')
    
  }

   useEffect(() => {
    console.log(props.uservalue.user)
    var email = props.uservalue.user && props.uservalue.user.email
    // console.log(email)

  autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {})

  autocomplete.addListener("place_changed", handlePlaceSelect)

  console.log('autocomplete: ', autocomplete);
    
  axios.post("http://localhost:5000/fetchUser/" , {email : email}).then((res)=> {
    console.log('res: ', res.data);

        setName((res.data)[0].name);
        setBodyType((res.data)[0].Body_type);
        setCost((res.data)[0].weight);
        setMobileNum((res.data)[0].MobileNumber);
        setCity((res.data)[0].city);
        setAddress((res.data)[0].address);
        setPostal((res.data)[0].postal);
        setDescription((res.data)[0].description);

           
    
    });
  },[props])

  const handlePlaceSelect = ()=> {
    let addressObject = autocomplete.getPlace()
    let address = addressObject.address_components
    
    setAddress(addressObject.name)
    setCity(address[4].long_name)
    setPostal(address[8].short_name)
    setGoogleMapLink(addressObject.url)
  }


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
                      value: props.uservalue.user ? props.uservalue.user.email : "",
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
            {(name && Body_type && props.uservalue.user.email && MobileNumber && weight && city && address && postal) ? 
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