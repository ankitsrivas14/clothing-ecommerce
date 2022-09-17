//REACT
import { useContext } from 'react'

//CSS
import './CartDropdown.scss'

//COMPONENTS
import Button from '../button/Button'
import CartItem from '../cart-item/CartItem'

//CONTEXT
import { CartContext } from '../../context/CartContext'

function CartDropdown() {

    const { cartItems } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown