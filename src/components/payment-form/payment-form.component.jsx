import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from './payment-form.styles';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import React from 'react';

const PaymentForm = (props) => {
  // const { clientSecret } = props;
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');

  const currentUser = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const paymentHandler = async (e) => {
    e.preventDefault();
    console.log('paymentHandler');

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:8888',
        payment_method_data: {
          billing_details: {
            name: currentUser ? currentUser.displayName : 'Guest',
          },
        },
      },
    });

    console.log({ error });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    // const reponse = await fetch('/.netlify/functions/create-payment-intent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ amount: amount }),
    // }).then((res) => res.json());

    // console.log('reponse', reponse);

    // const clientSecret = reponse.paymentIntent.client_secret;
    // console.log({ clientSecret });
    // const paymentResult = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       name: currentUser ? currentUser.displayName : 'Guest',
    //     },
    //   },
    // });

    // setIsProcessingPayment(false);

    // if (paymentResult.error) {
    //   console.log('paymentResult.error', paymentResult.error);
    // } else {
    //   if (paymentResult.paymentIntent.status === 'succeeded') {
    //     console.log('paymentResult', paymentResult);
    //   }
    // }
    setIsProcessingPayment(false);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <PaymentElement id="payment-element" />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
        {message && <div id="payment-message">{message}</div>}
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
