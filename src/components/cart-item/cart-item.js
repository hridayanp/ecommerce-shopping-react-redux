import React from 'react'
import './cart-item.styles.jsx'
import { CartItemContainer, CartItemDetails } from './cart-item.styles.jsx';

export const CartItem = ({ cartItem }) => {
    const { name, quantity, price, imageUrl } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <CartItemDetails>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </CartItemDetails>
        </CartItemContainer>
    )
}
