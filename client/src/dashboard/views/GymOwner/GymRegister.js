import React, {useState, useEffect, useRef} from "react";

/* global google */

// @material-ui/core components
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

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

function GymRegister(props) {
  const classes = useStyles();

  const history = useHistory()
  
  const [gym , setGym] = useState('')
  const [cost , setCost] = useState('')
  // const [email , setEmail] = useState('')   //controlling from redux
  const [name , setName] = useState('')
  const [propertyGovt , setPropertyGovt] = useState('')
  const [city , setCity] = useState('')
  const [address , setAddress] = useState('')
  const [postal , setPostal] = useState('')
  const [description , setDescription] = useState('')
  const [approved , setApproved] = useState(0)
  const [slots , setSlots] = useState([])
  const [img , setImg] = useState('')
  const [state , setState] = useState('')
  const [googleMapLink , setGoogleMapLink] = useState('')

  var autocomplete = null

    const onSubmit= (e) => {
    e.preventDefault();

    const data= {
      'gym':gym,
      'email':props.uservalue.user.email,
      'name':name,
      'propertyGovt':propertyGovt,
      'cost':cost,
      'city':city,
      'state': state,
      'address':address,
      'postal':postal,
      'description':description,
      'approved': approved==1 ? approved : 0,
      'slots' :slots,
      'img':img.length>0 ? img :'gym'+Math.floor(Math.random() * 9)
    }

    console.log('data submitted: ', data);

    axios.post("http://localhost:5000/gym_register/", data).then((res) => {
      console.log(res.data);
    });
    alert('Gym profile submitted. Wait for sometime to approve.')

    history.push('/')
    
  }

   useEffect(() => {

  autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {})

  autocomplete.addListener("place_changed", handlePlaceSelect)

  console.log('autocomplete: ', autocomplete);
    
  axios.get("http://localhost:5000/gymList/").then((res)=> {
    //console.log('res: ', res.data);

    for(let i=0; i<res.data.length;i++){
      
      if(props.uservalue.user){
        if ((res.data)[i].email==props.uservalue.user.email)
      {
        //console.log('(res.data)[i]: ',(res.data)[i]);

        setGym((res.data)[i].gym);
        setName((res.data)[i].name);
        setCost((res.data)[i].cost);
        setPropertyGovt((res.data)[i].propertyGovt);
        setCity((res.data)[i].city);
        setState((res.data)[i].state);
        setAddress((res.data)[i].address);
        setPostal((res.data)[i].postal);
        setDescription((res.data)[i].description);
        setApproved((res.data)[i].approved);
        setSlots((res.data)[i].slots);
        setImg((res.data)[i].img);
        break
      }
      }      
    }
    });
  },[])

  const handlePlaceSelect = ()=> {
    let addressObject = autocomplete.getPlace()
    let address = addressObject.address_components
    
    setAddress(addressObject.name)
    setCity(address[4].long_name)
    setState(address[6].short_name)
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
                    labelText="Cost per hour"
                    id="cost"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Gym property govt registration"
                    id="gym-registration"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
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
                    useRef="input"
                    labelText="Address"
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
                    labelText="Fill any description detail if needed"
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
            {(gym && name && props.uservalue.user.email && propertyGovt && cost && city && address && postal) ? 
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

export default connect(mapStateToProps)(GymRegister)