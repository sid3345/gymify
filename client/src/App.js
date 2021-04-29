import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/App.css";
import NavBar from "./components/NavBar";
import Home from "./Home";
import Status from "./Status";
import Error from "./Error";
import EventsList from "./EventsList";
import Login from "./components/Login";
import { auth } from "./firebase";

import {connect} from 'react-redux'
import store from "./Store";


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

    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/status" component={Status} />
        <Route path="/listAll" component={EventsList} />
        <Route path="/login" component={Login} />

        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};




export default connect()(App);
