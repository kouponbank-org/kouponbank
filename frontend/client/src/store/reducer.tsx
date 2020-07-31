import { combineReducers } from 'redux'

import { reducer as mainReducer } from "./main-reducer";

export const reducer = combineReducers({
    mainReducer: mainReducer
});
