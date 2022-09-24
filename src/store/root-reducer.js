import { combineReducers } from 'redux'

//REDUCERS
import { userReducer } from './user/user.reducer'

export const rootReducer = combineReducers({
    user: userReducer
})