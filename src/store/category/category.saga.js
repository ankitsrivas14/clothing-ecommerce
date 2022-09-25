//REDUX
import { takeLatest, all, call, put } from 'redux-saga/effects'
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORY_ACTION_TYPES } from './category.types';

//FIREBASE
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";


export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));

    } catch (error) {
        put(fetchCategoriesFailed(error));
    }
}

export function* onfetchCategories(){
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga(){
    yield all([ call(onfetchCategories) ]);
}