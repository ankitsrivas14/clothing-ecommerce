//REACT
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//CSS
import { CartDropdownContainer, EmptyMessage, CartItems } from './CartDropdown.styles.jsx'

//COMPONENTS
import Button from '../button/Button'
import CartItem from '../cart-item/CartItem'

//CONTEXT
import { CartContext } from '../../context/CartContext'

function CartDropdown() {

    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setIsCartOpen(false);
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