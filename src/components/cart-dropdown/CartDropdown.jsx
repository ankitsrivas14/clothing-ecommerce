//REACT
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { setIsCartOpen } from '../../store/cart/cart.action.js'
import { selectCartItems } from '../../store/cart/cart.selector.js'

//CSS
import { CartDropdownContainer, EmptyMessage, CartItems } from './CartDropdown.styles.jsx'

//COMPONENTS
import Button from '../button/Button'
import CartItem from '../cart-item/CartItem'

function CartDropdown() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);

    const goToCheckoutHandler = () => {
        dispatch(setIsCartOpen(false))
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? 
                    cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    )) :
                    (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown