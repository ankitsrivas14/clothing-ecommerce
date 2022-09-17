//REACT
import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"

//CSS
import './Navigation.scss'

//ICONS
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'

//CONTEXT
import { UserContext } from "../../context/UserContext"
import { CartContext } from "../../context/CartContext"

//FIREBASE
import { signOutUser } from "../../utils/firebase/firebase"

//COMPONENTS
import CartIcon from "../cart-icon/CartIcon"
import CartDropdown from "../cart-dropdown/CartDropdown"

function Navigation() {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo className="logo" />
                </Link>
                
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>SHOP</Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                    ) : (
                        <Link className="nav-link" to='/sign-in'>SIGN IN</Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </>
    )
}

export default Navigation