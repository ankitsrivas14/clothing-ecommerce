//REACT
import { useContext } from 'react'

//CSS / ICONS
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './CartIcon.scss'

//CONTEXT
import { CartContext } from '../../context/CartContext'


function CartIcon() {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    return (
        <div className='cart-icon-container' onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{ cartCount }</span>
        </div>
    )
}

export default CartIcon