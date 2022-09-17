//REACT
import { useContext } from "react"

//CONTEXT
import { CategoriesContext } from "../../context/CategoriesContext";

//COMPONENTS
import CategoryPreview from "../../components/category-preview/CategoryPreview";


function CategoriesPreview() {

    const { categoriesMap } = useContext(CategoriesContext);

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