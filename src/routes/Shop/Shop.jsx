//REACT
import { Routes, Route } from 'react-router-dom';

//CSS
import './Shop.scss'

//COMPONENTS
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';



function Shop() {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}

export default Shop