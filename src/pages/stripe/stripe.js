import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkout form";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51KPoDwSCvOQSrarqzFnswTOemon01sMbOVJG3hWpjkz8VbLP9yugYf22rTN3Eb1OGmrXfrRbQNDPW3pSfpa8PmwI00GVUk1a16");

let Stripe = ({clientSecret,orderId}) => {

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      )}
    </div>
  );
}



export default Stripe