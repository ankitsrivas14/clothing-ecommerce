import { createAction } from "../../utils/reducer/reducer"
import { CATEGORY_ACTION_TYPES } from "./category.types"

//FIREBASE
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";


export const fetchCategoriesStart = () => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);
}
export const fetchCategoriesSuccess = (categoriesArray) => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
}
export const fetchCategoriesFailed = (error) => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
}

export const fetchCategoriesAsync = () => async (dispatch) => {

    dispatch(fetchCategoriesStart());

    try {

        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));

    } catch (error) {

        dispatch(fetchCategoriesFailed(error));

    }
}