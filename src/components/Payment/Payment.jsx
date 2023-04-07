import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import { RiSecurePaymentFill } from "react-icons/ri";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/mastercard.svg";
import americanexpress from "../../assets/americanexpress.svg";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({
  totalPrice,
  property,
  renter,
  startDate,
  endDate,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const cardElementOptions = {
    style: {
      base: {
        color: "#605cb8",
      },
    },
    classes: {
      base: "form-control",
      complete: "is-valid",
      empty: "is-invalid",
      error: "invalid-feedback",
      invalid: "is-invalid",
      webkitAutofill: "autocomplete",
    },
    disabled: false,
  };

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
        const { data } = await axios.post(
          "http://localhost:8080/api/checkout",
          {
            id,
            amount: totalPrice, // Convert to cents
            property,
            renter,
            startDate,
            endDate,
          }
        );

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
    <form className="payment-form" onSubmit={handleSubmit}>
      <h4 className="payment-title">Payment Details</h4>
      <div className="payment-card">
        <CardElement options={cardElementOptions} />
      </div>

      <div className="text-center mt-4">
        <button
          type="submit"
          className="cta-button payment"
          disabled={!stripe || loading}
        >
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            "Book Now"
          )}
        </button>
      </div>

      <div className="payment-security">
        <span style={{ marginRight: "8px" }}>
          <RiSecurePaymentFill />
        </span>
        <small>
          Your payment is secure with us. <br></br>
          <br></br>We are a verified payment solution and use the latest
          encryption technology to protect your personal and payment
          information.
        </small>
      </div>

      <div className="payment-methods">
        <div className="payment-methods-title">
          <small>We process Visa, Mastercard & AmericanExpress payments.</small>
        </div>
        <div className="payment-methods-icons">
          <div className="payment-methods-icon">
            <img src={visa} alt="Visa" width="16" height="32" />
          </div>
          <div className="payment-methods-icon">
            <img src={mastercard} alt="Mastercard" width="16" height="32" />
          </div>
          <div className="payment-methods-icon">
            <img
              src={americanexpress}
              alt="American Express"
              width="16"
              height="32"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

function Payment({
  totalPrice,
  property,
  renter,
  startDate,
  endDate,
  onPaymentSuccess,
}) {
  return (
    <Elements stripe={stripePromise}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
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
