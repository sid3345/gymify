import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import store from '../Store';
import { Button } from "reactstrap";
import axios from 'axios';


class Payments extends Component {
  render() {

    return (
      <StripeCheckout
        name= "GYMIFY"
        // amount={this.props.price * 100}
        amount={50000}
        currency = 'INR'
      //   token={token => store.dispatch({type : 'SET_TOKEN' , payload : token})
      // }
        token={token => {axios.post("http://localhost:5000/updateWallet" , {wallet : this.props.wallet , email : this.props.uservalue.user.email})
        .then((res) => {
          console.log(res.data)
        }) ; window.location.reload()}}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button color="primary" className="mx-2">
          Payments
        </Button>
      </StripeCheckout >
       
     
    );
  }
}
const mapStateToProps = (state) =>{
  return{
    uservalue : state
  }
}

export default connect(mapStateToProps)(Payments);
