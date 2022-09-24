//REACT

//REDUX
import { useSelector } from "react-redux";

//COMPONENTS
import CategoryPreview from "../../components/category-preview/CategoryPreview";


function CategoriesPreview() {

    const { categoriesMap } = useSelector(state => state.category);

    return (
        <>
            {Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products} />
            })}
        </>
    )
}

export default CategoriesPreview