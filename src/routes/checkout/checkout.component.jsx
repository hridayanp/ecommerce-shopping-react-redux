import { useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles';
import PaymentForm from '../../components/payment-form/payment-form.component';
import { useState } from 'react';
import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../utils/stripe/stripe.utils';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [stripeClientSecret, setStripeClientSecret] = useState('');

  const fetchPaymentIntent = async () => {
    const reponse = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: cartTotal }),
    }).then((res) => res.json());

    console.log('reponse', reponse);
    const clientSecret = reponse.paymentIntent.client_secret;
    setStripeClientSecret(clientSecret);
  };

  const options = {
    clientSecret: stripeClientSecret,
    appearance: {
      theme: 'night',
      labels: 'floating',
    },
  };

  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
      {stripeClientSecret && (
        <Elements
          options={options}
          stripe={stripePromise}
          key={stripeClientSecret}
        >
          <PaymentForm />
        </Elements>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;
