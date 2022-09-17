//REACT
import { Link } from 'react-router-dom'


//CSS
import './CategoryPreview.scss'

//COMPONENTS
import ProductCard from '../product-card/ProductCard'

function CategoryPreview( { title, products } ) {

    return (
        <div className='category-preview-container'>
            <h2><Link className='title' to={title}>{title.toUpperCase()}</Link></h2>
            <div className="preview">
                {
                    products.filter((_,index) => index < 4).map(product => 
                        <ProductCard key={product.id} product={product} />
                    )
                }
            </div>
        </div>
    )
}

export default CategoryPreview