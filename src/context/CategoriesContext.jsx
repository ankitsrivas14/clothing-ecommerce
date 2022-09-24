//REACT
import { createContext, useState, useEffect } from "react";


//FIREBASE
import { getCategoriesAndDocuments } from "../utils/firebase/firebase";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments();
            setCategoriesMap(categories)
        }
        getCategories();
    }, [])

    const value = {
        categoriesMap,
    }
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}