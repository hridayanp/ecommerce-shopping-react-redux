import './cart-dropdown.styles';
import { Button } from '../button/button';
import { CartItem } from '../cart-item/cart-item';
import { useSelector } from 'react-redux';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { selectCartItems } from '../../store/cart/cart.selector';

export const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((item) => (
                            <CartItem key={item.id} cartItem={item} />
                        ))
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    );
};
