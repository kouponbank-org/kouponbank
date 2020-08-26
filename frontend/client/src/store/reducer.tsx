import { combineReducers } from 'redux';
import { reducer as userReducer } from "./user/user-reducer";

export const reducer = combineReducers({
    userReducer: userReducer
});
