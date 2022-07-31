import React from 'react';
import { Button, BUTTON_TYPE_CLASSES } from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Name, Price, ProductCardContainer } from './ProductCard.styles';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { name, price, imageUrl } = product;

    const addProductToCart = () => dispatch({
        type: 'cart/SET_CART_ITEMS',
        payload: [...cartItems, product],
    }
        // addItemToCart(
        //     cartItems,
        //     product,
        // )
    );

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
                Add to Cart
            </Button>
        </ProductCardContainer>
    );
};
