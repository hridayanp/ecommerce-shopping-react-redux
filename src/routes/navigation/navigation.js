import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';
import { CartIcon } from '../../components/cart-icon/cart-icon';
import { CartDropdown } from '../../components/cart-dropdown/cart-dropdown';
import { CartContext } from '../../contexts/cart.context';

import { LogoContainer, NavigationContainer, NavLink, NavLinks } from './navigation.styles';

export const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    // console.log(currentUser);


    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <Logo className="logo" />
                </LogoContainer>

                <NavLinks>
                    <NavLink to="/shop" className="nav-link">
                        SHOP
                    </NavLink>
                    <NavLink to="/contact" className="nav-link">
                        CONTACT
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser} className="nav-link">
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/auth" className="nav-link">
                            SIGN IN
                        </NavLink>
                    )}

                    <CartIcon />
                </NavLinks>

                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};
