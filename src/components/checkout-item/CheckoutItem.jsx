//REACT
import { useContext } from 'react'

//CSS
import {
    CheckoutItemContainer, 
    ImageContainer,
    DataItem,
    RemoveButton,
    Arrow,
    Value
} from './CheckoutItem.styles.jsx'

//CONTEXT
import { CartContext } from '../../context/CartContext'

function CheckoutItem({ cartItem }) {

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const { name, imageUrl, price, quantity } = cartItem;

    const addItemHandler = () => addItemToCart(cartItem)
    const removeItemHandler = () => removeItemFromCart(cartItem)
    const clearItemHandler = () => clearItemFromCart(cartItem)

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