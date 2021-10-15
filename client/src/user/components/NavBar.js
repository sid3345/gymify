import React, { useState , useEffect } from "react";
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
import store from "../Store";



const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const[checked , setChecked] = useState(false)

  const toggle = () => setIsOpen(!isOpen);

  const history = useHistory()

  const handleAuthentication = () =>{
    if (props.uservalue.user){
        localStorage.removeItem('userData')
        auth.signOut()
        history.push('/')
    }
  }

var listEvent = <Link to="/listAll">
                <Button color="primary" className="mx-2">
                  Bookings
                </Button>
              </Link>

var owner = <div>
              <Link to = "/register_gym/profile">
                <Button color="primary" className="mx-2">
                  Profile
                </Button>
              </Link>
              <Link to = "/owner">
                <Button color="primary" className="mx-2">
                  Dashboard
                </Button>
              </Link>
              </div>

var money = <div>
             <Button color = "primary" className="mx-2">
              Money : {props.uservalue.wallet}
             </Button>

            <Link to = "/userProfile">
            <Button color="primary" className="mx-2">
              Profile
            </Button>
            </Link>

           </div>

var signout = <Button color="primary" className="mx-2" onClick = {handleAuthentication}>
              Sign Out
             </Button>

var signin = <Link to = '/login'>
              <Button color="primary" className="mx-2" >
                    Sign In / Register
              </Button>
             </Link>
                
useEffect(() => {
  // console.log(props.uservalue.user)
  if(props.uservalue.user){
    axios.post("http://localhost:5000/fetchUser" , {email : props.uservalue.user.email})
    .then((res) =>{
      console.log(res.data[0])
      setChecked(res.data[0].checked)
      store.dispatch({type : 'SET_WALLET' , payload : res.data[0].wallet})  
      
    })
    
  }
}, [props.uservalue.user])


  return (
    <div>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">GYMIFY</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

          {props.uservalue.user ? (!checked ? <Payments wallet = {props.uservalue.wallet}/> : null) : null}

          {props.uservalue.user ? (checked ? owner : listEvent) : null}

          {props.uservalue.user ? (!checked ? money : null): null}

          {props.uservalue.user ? signout : null}

          {!props.uservalue.user ? signin : null}
          
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
