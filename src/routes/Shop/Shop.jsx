//REACT
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//REDUX
import { setCategories } from '../../store/category/category.action';
import { useDispatch } from 'react-redux';

//COMPONENTS
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';

//FIREBASE
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

function Shop() {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        }
        getCategories();
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}

export default Shop