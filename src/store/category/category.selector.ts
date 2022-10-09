//REDUX
import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const categoryReducer = (state: any): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [categoryReducer],
    (categorySlice) => categorySlice.categories
)


export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => {
        return categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items
            return acc;
        }, {} as CategoryMap) 
    }
)

export const selectCategoriesIsLoading = createSelector(
    [categoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)