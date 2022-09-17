//REACT
import { useContext } from "react"

//CONTEXT
import { ProductsContext } from "../../context/ProductsContext"

//CSS
import './Shop.scss'

//COMPONENTS
import ProductCard from "../../components/product-card/ProductCard";


function Shop() {

    const { products } = useContext(ProductsContext);

    return (
        <div className="products-container">
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop