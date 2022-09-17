//REACT
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

//CSS
import './Category.scss'

//CONTEXT
import { CategoriesContext } from '../../context/CategoriesContext';

//COMPONENTS
import ProductCard from '../../components/product-card/ProductCard';

function Category() {

    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])


    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className="category-container">
                {products && products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default Category