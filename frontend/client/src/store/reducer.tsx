import { combineReducers } from 'redux';
import { reducer as userReducer } from "./user/user-reducer";
import { reducer as ownerReducer } from "./owner/owner-reducer";

export const reducer = combineReducers({
    userReducer: userReducer,
    ownerReducer: ownerReducer
});
