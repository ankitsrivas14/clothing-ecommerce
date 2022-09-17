//REACT
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//CSS
import './CartDropdown.scss'

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
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown