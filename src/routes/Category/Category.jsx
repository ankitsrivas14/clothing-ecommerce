//REACT
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

//CSS
import {CategoryContainer, CategoryTitle} from './Category.styles.jsx'

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
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products && products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </CategoryContainer>
        </>
    )
}

export default Category