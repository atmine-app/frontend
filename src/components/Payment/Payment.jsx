import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "axios";

const stripePromise = loadStripe("pk_test_51MmyyDKnGwuMyNJVONhuTT5rVNMCvb0myhaquhex7FCieyfT2PSQhs2gr8SR102hgdYR8n0jiWdWv4pRY4NXVNuo00jIHuiXfc");

const CheckoutForm = ({ totalPrice, property, renter, startDate, endDate, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);
  
    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:8080/api/checkout", {
          id,
          amount: totalPrice, // Convert to cents
          property,
          renter,
          startDate,
          endDate,
        });
  
        console.log(data);
  
        elements.getElement(CardElement).clear();
  
        // Call onPaymentSuccess function
        onPaymentSuccess();
  
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div>
        <CardElement />
      </div>

      <button disabled={!stripe}>
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

function Payment({ totalPrice, property, renter, startDate, endDate, onPaymentSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <div>
          <div>
            <CheckoutForm
              totalPrice={totalPrice}
              property={property}
              renter={renter}
              startDate={startDate}
              endDate={endDate}
              onPaymentSuccess={onPaymentSuccess}
            />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;