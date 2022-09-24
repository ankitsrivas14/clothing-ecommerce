//REACT

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action.js';
import { selectCartItems } from '../../store/cart/cart.selector.js';

//CSS
import {
    CheckoutItemContainer, 
    ImageContainer,
    DataItem,
    RemoveButton,
    Arrow,
    Value
} from './CheckoutItem.styles.jsx'


function CheckoutItem({ cartItem }) {
    const { name, imageUrl, price, quantity } = cartItem;

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);


    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <DataItem>{name}</DataItem>
            <DataItem>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </DataItem>
            <DataItem>{price}</DataItem>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem