//REACT
import { useContext } from 'react'

//CSS / ICONS

import {CartIconContainer, ShoppingIcon, ItemCount} from './CartIcon.styles.jsx'

//CONTEXT
import { CartContext } from '../../context/CartContext'


function CartIcon() {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    return (
        <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingIcon />
            <ItemCount>{ cartCount }</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon