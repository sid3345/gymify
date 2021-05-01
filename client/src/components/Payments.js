import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import store from '../Store';



class Payments extends Component {
  render() {

    return (
      <StripeCheckout
        name= "GYMIFY"
        amount={500}
        currency = 'INR'
        token={token => store.dispatch({type : 'SET_TOKEN' , payload : token})}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button color="primary" className="m-2">
          Payments
        </button>
      </StripeCheckout >
       
     
    );
  }
}

export default connect()(Payments);
