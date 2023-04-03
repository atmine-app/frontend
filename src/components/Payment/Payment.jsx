import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import axios from "axios";

const stripePromise = loadStripe("pk_test_51MmyyDKnGwuMyNJVONhuTT5rVNMCvb0myhaquhex7FCieyfT2PSQhs2gr8SR102hgdYR8n0jiWdWv4pRY4NXVNuo00jIHuiXfc")

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      const { id } = paymentMethod;
      const { data } = await axios.post(
        "http://localhost:3000/api/checkout",
        {
          id,
          amount: 10000, //cents
        }
      );
  
      if (!data.success) {
        throw new Error("Payment failed");
      }
  
      // Redirect to confirmation page
      window.location.href = "/confirmation";
    } catch (error) {
      console.log(error.message);
      // Display error message to user
    }
  
    setLoading(false);
  };

  console.log(!stripe || loading);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* product Info */}
      <img
        src="https://www.corsair.com/medias/sys_master/images/images/h80/hdd/9029904465950/-CH-9109011-ES-Gallery-K70-RGB-MK2-01.png"
        alt="Corsair Gaming Keyboard RGB"
        className="img-fluid"
        width={'200px'}
      />

      <h3 className="text-center my-2">Price: 100$</h3>

      {/* cardInput from Stripe */}
      <div className="form-group">
        <CardElement />
      </div>

      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
    
  );
}

export default Payment;
