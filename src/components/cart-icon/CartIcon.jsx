//REACT
import { useContext } from 'react'

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';

//CSS / ICONS
import {CartIconContainer, ShoppingIcon, ItemCount} from './CartIcon.styles.jsx'



function CartIcon() {

    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{ cartCount }</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon