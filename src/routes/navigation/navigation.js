import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import './navigation.styles.scss';

export const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <Logo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">SHOP</Link>
                    <Link to="/contact" className="nav-link">CONTACT</Link>
                    <Link to="/auth" className="nav-link">SIGN IN</Link>
                </div>
            </div>
            <Outlet />
        </Fragment>

    )
}
