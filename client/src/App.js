import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./user/assets/css/App.css";
import NavBar from "./user/components/NavBar";
import Home from "./user/Home";
import Status from "./user/Status";
import Error from "./user/Error";
import EventsList from "./user/EventsList";
import Login from "./user/components/Login";
import { auth } from "./user/firebase";
import { createBrowserHistory } from "history";
import GymRegister from './user/components/GymRegister'

import {connect} from 'react-redux'
import store from "./user/Store";

import "./dashboard/assets/css/material-dashboard-react.css?v=1.9.0";

// core components
import Admin from "./dashboard/layouts/Admin";
import GymHome from "./user/components/GymHome";

const hist = createBrowserHistory();

const App = (props) => {

  useEffect(() =>{
    
    auth.onAuthStateChanged((authUser =>{
      
      if (authUser){
        store.dispatch({type : 'SET_USER' , payload : authUser})
      }
      else{
        store.dispatch({type : 'SET_USER' , payload : null})
      }
      

    }))
  }, [])

  var showNav = true
  var admin = false

  useEffect(() => {
     if(props.uservalue.user){
    // console.log(props.uservalue.user.email)
    if(props.uservalue.user.email == "admin@admin.com"){
      showNav = false
      admin = true
      
    }
  }
  }, [props.uservalue.user])

  return (

    <Router history={hist}>
      {showNav ? <NavBar /> : null}
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/status" component={Status} />
        {props.uservalue.user ? <Route path="/listAll" component={EventsList} /> : null}
        <Route path="/login" component={Login} />
        <Route path="/register_gym/profile" component={GymRegister} />

        <Route path="/register_gym" component={GymHome} />

        {admin ? <Route path="/admin" component={Admin} /> : null}  

        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};



const mapStateToProps = (state) =>{
  return{
    uservalue : state
  }
}

export default connect(mapStateToProps)(App);
