import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import { CartIcon } from '../../components/cart-icon/cart-icon';
import { CartDropdown } from '../../components/cart-dropdown/cart-dropdown';

import { LogoContainer, NavigationContainer, NavLink, NavLinks } from './navigation.styles';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

export const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen)

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
