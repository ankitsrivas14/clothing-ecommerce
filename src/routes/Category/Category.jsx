//REACT
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

//REDUX
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/category/category.selector.js';

//CSS
import {CategoryContainer, CategoryTitle} from './Category.styles.jsx'


//COMPONENTS
import ProductCard from '../../components/product-card/ProductCard';
import Spinner from '../../components/spinner/Spinner'

function Category() {

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])


    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading ? <Spinner /> : <CategoryContainer>
                    {products && products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </CategoryContainer>
            }
        </>
    )
}

export default Category