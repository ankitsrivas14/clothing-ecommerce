//REDUX
import { createSelector } from "reselect";

const categoryReducer = (state) => state.category;

export const selectCategories = createSelector(
    [categoryReducer],
    (categorySlice) => categorySlice.categories
)


export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items
            return acc;
        }, {}) 
    }
)

export const selectCategoriesIsLoading = createSelector(
    [categoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)