//REACT
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

//REDUX
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/category/category.selector.js';

//CSS
import {CategoryContainer, CategoryTitle} from './Category.styles.jsx'


//COMPONENTS
import ProductCard from '../../components/product-card/ProductCard';

function Category() {

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
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