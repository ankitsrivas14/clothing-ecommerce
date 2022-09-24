//REACT

//REDUX
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector.js';

//CSS
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './Checkout.styles.jsx'


//COMPONENTS
import CheckoutItem from '../../components/checkout-item/CheckoutItem';

function Checkout() {

    const cartItems = useSelector(selectCartItems);
    const cartTotal  = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock><span>Product</span></HeaderBlock>
                <HeaderBlock><span>Description</span></HeaderBlock>
                <HeaderBlock><span>Quantity</span></HeaderBlock>
                <HeaderBlock><span>Price</span></HeaderBlock>
                <HeaderBlock><span>Remove</span></HeaderBlock>
            </CheckoutHeader>
            {cartItems.map(item => (
                <CheckoutItem key={item.id} cartItem={item} />
            ))}
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout