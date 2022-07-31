import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

export const CartIcon = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const dispatch = useDispatch();

    const toggleIsCartOpen = () => {
        dispatch({
            type: 'cart/SET_IS_CART_OPEN',
            payload: !isCartOpen,
        })
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
