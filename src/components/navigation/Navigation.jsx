//REACT
import { useContext } from "react"
import { Outlet } from "react-router-dom"

//CSS
import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from './Navigation.styles'

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
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className="logo" />
                </LogoContainer>
                
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='/sign-in'>SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    )
}

export default Navigation