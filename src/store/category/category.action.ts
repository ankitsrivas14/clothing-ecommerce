import { createAction, Action, ActionWithPayload } from "../../utils/reducer/reducer"
import { CATEGORY_ACTION_TYPES, Category } from "./category.types"

export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FetchCategoriesFailed = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

export const fetchCategoriesStart = (): FetchCategoriesStart => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);
}

export const fetchCategoriesSuccess = (categoriesArray: Category[]): FetchCategoriesSuccess => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
}

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
}