//REACT
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//REDUX
import { fetchCategoriesStart } from '../../store/category/category.action';
import { useDispatch } from 'react-redux';

//COMPONENTS
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';



function Shop() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}

export default Shop