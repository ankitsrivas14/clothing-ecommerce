//REACT
import { useContext } from 'react'

//CSS
import {ProductCardContainer, Footer, Name, Price} from './ProductCard.styles.jsx'

//COMPONENTS
import Button, { BUTTON_TYPES_CLASSES } from '../button/Button'

//CONTEXT
import { CartContext } from '../../context/CartContext'

function ProductCard({ product }) {
    const {name, price, imageUrl} = product

    const { addItemToCart } = useContext(CartContext)

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{ name }</Name>
                <Price>{ price }</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={() => addItemToCart(product)}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard