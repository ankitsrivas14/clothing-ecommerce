//REACT
import { useContext } from "react"
import { Outlet } from "react-router-dom"

//REDUX
import { useSelector } from "react-redux"

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
import { CartContext } from "../../context/CartContext"

//FIREBASE
import { signOutUser } from "../../utils/firebase/firebase"

//COMPONENTS
import CartIcon from "../cart-icon/CartIcon"
import CartDropdown from "../cart-dropdown/CartDropdown"

function Navigation() {

    const { isCartOpen } = useContext(CartContext);
    const { currentUser } = useSelector(state => state.user);

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