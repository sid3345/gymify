import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {auth} from "../firebase"
import {connect} from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
} from "reactstrap";
import axios from "axios";
import Payments from "./Payments";



const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const[checked , setChecked] = useState(false)

  const[wallet , setWallet] = useState(0)

  const toggle = () => setIsOpen(!isOpen);

  const history = useHistory()

  const handleAuthentication = () =>{
    if (props.uservalue.user){
        auth.signOut()
        history.push('/')
    }
  }

var listEvent = <Link to="/listAll">
                <Button color="primary" className="mx-2">
                  List All bookings
                </Button>
              </Link>

var profile = <Link to = "/register_gym/profile">
                <Button color="primary" className="mx-2">
                  Profile
                </Button>
              </Link>

var money = <Button color = "primary" className="mx-2">
              Money : {wallet}
             </Button>
                

if(props.uservalue.user){
  axios.post("http://localhost:5000/fetchUser" , {email : props.uservalue.user.email})
  .then((res) =>{
    console.log(res.data[0])
    setChecked(res.data[0].checked)
    setWallet(res.data[0].wallet)
    
  })
}

  return (
    <div>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">GYMIFY</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          {props.uservalue.user ? (!checked ? <Payments wallet = {wallet}/> : null) : null}

          {props.uservalue.user ? (checked ? profile : listEvent) : null}

          {props.uservalue.user ? (!checked ? money : null): null}

          <Link to = {!props.uservalue.user && '/login'}>
                <Button color="primary" className="mx-2" onClick = {handleAuthentication}>
                      {props.uservalue.user ? 'Sign Out' : 'Sign In / Register'}
                </Button>
          </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) =>{
  return{
    uservalue : state
  }
}

export default connect(mapStateToProps)(NavBar);
