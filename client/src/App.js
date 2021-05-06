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

  return (

    <Router history={hist}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/status" component={Status} />
        <Route path="/listAll" component={EventsList} />
        <Route path="/login" component={Login} />

        <Route path="/admin" component={Admin} />

        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};




export default connect()(App);
