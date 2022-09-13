//REACT
import { Outlet, Link } from "react-router-dom"

//CSS
import './Navigation.scss'

//ICONS
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'

function Navigation() {
    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo className="logo" />
                </Link>
                
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>Shop</Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navigation