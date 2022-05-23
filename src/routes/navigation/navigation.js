import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';

export const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    // console.log(currentUser);


    return (
        <Fragment>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <Logo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">
                        SHOP
                    </Link>
                    <Link to="/contact" className="nav-link">
                        CONTACT
                    </Link>
                    {currentUser ? (
                        <span onClick={signOutUser} className="nav-link">
                            SIGN OUT
                        </span>
                    ) : (
                        <Link to="/auth" className="nav-link">
                            SIGN IN
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};
