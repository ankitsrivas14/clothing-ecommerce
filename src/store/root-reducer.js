import { combineReducers } from 'redux'

//REDUCERS
import { userReducer } from './user/user.reducer'
import { categoryReducer } from './category/category.reducer'
import { cartReducer } from './cart/cart.reducer'

export const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer,
})