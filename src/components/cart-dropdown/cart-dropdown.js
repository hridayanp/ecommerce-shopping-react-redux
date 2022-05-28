import './cart-dropdown.scss';
import { Button } from '../button/button';

import React from 'react'

export const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' />
            <Button>CHECKOUT</Button>
        </div>
    )
}
