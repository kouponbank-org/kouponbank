import { combineReducers } from 'redux';
import { reducer as notificationReducer } from "./notifications/notification-reducer";
import { reducer as userReducer } from "./user/user-reducer";

export const reducer = combineReducers({
    userReducer: userReducer,
    notificationReducer: notificationReducer,
});
