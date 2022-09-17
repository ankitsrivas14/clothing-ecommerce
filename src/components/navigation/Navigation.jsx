//REACT
import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"

//CSS
import './Navigation.scss'

//ICONS
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'

//CONTEXT
import { UserContext } from "../../context/UserContext"

//FIREBASE
import { signOutUser } from "../../utils/firebase/firebase"

function Navigation() {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
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
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navigation