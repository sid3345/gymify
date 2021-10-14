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
  
  const [name , setName] = useState('')
  const [weight , setCost] = useState('')
  // const [email , setEmail] = useState('')   //controlling from redux
  const [Body_type , setBodyType] = useState('')
  const [MobileNumber , setMobileNum] = useState('')
  const [city , setCity] = useState('')
  const [address , setAddress] = useState('')
  const [postal , setPostal] = useState('')
  const [description , setDescription] = useState('')
  // const [approved , setApproved] = useState(0)
  // const [slots , setSlots] = useState([])
  // const [img , setImg] = useState('')
  // const [state , setState] = useState('')
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
      // 'state': state,
      'address':address,
      'postal':postal,
      'description':description,
      // 'approved': approved==1 ? approved : 0,
      // 'slots' :slots,
    //   'img':img.length>0 ? img :'name'+Math.floor(Math.random() * 9)
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

    for(let i=0; i<res.data.length;i++){
      
      if(props.uservalue.user){
        if ((res.data)[i].email==props.uservalue.user.email)
      {
        //console.log('(res.data)[i]: ',(res.data)[i]);

        setName((res.data)[i].name);
        setBodyType((res.data)[i].Body_type);
        setCost((res.data)[i].weight);
        setMobileNum((res.data)[i].MobileNumber);
        setCity((res.data)[i].city);
        // setState((res.data)[i].state);
        setAddress((res.data)[i].address);
        setPostal((res.data)[i].postal);
        setDescription((res.data)[i].description);
        // setApproved((res.data)[i].approved);
        // setSlots((res.data)[i].slots);
        // setImg((res.data)[i].img);
        break
      }
      }      
    }
    });
  },[props])

  const handlePlaceSelect = ()=> {
    let addressObject = autocomplete.getPlace()
    let address = addressObject.address_components
    
    setAddress(addressObject.name)
    setCity(address[4].long_name)
    // setState(address[6].short_name)
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
              <h4 className={classes.cardTitleWhite}>Register Gym</h4>
              <p className={classes.cardCategoryWhite}>Fill in your Gym Profile</p>
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
                    onChange: e => setPostal(e.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Description</InputLabel>
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