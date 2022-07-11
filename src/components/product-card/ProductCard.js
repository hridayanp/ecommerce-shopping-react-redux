import React from 'react';
import { Button, BUTTON_TYPE_CLASSES } from '../button/button';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Footer, Name, Price, ProductCardContainer } from './ProductCard.styles';

export const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);

    const { name, price, imageUrl } = product;

    const addProductToCart = () => addItemToCart(product);

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
