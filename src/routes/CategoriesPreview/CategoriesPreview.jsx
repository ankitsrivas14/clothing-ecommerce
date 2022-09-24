//REACT

//REDUX
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/category/category.selector";

//COMPONENTS
import CategoryPreview from "../../components/category-preview/CategoryPreview";


function CategoriesPreview() {

    const categoriesMap = useSelector(selectCategoriesMap);

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