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

import {connect} from 'react-redux'
import store from "./user/Store";

import "./dashboard/assets/css/material-dashboard-react.css?v=1.9.0";

// core components
import Admin from "./dashboard/layouts/Admin";
import Owner from "./dashboard/layouts/Owner";
import GymRegister from "./dashboard/views/GymOwner/GymRegister";

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

  if(props.uservalue.user){
    if(props.uservalue.user.email == "admin@admin.com"){
      showNav = false
      admin = true
    }
  }
  return (

    <Router history={hist}>
      {showNav ? <NavBar /> : null}
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/status" component={Status} />
        {props.uservalue.user ? <Route path="/listAll" component={EventsList} /> : null}
        {props.uservalue.user ? (props.uservalue.user.email  == "admin@admin.com" ?<Route path="/admin" component={Admin} /> : null) : null}
        <Route path="/owner" component={Owner} />
        <Route path="/login" component={Login} />

        <Route path="/register_gym/profile" component={GymRegister} />

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
