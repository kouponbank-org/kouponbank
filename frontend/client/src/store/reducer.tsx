import { combineReducers } from 'redux';
import { reducer as notificationReducer } from "./notification/notification-reducer";
import { reducer as userReducer } from "./user/user-reducer";

export const reducer = combineReducers({
    userReducer: userReducer,
    notificationReducer: notificationReducer,
});

export type RootReducer = ReturnType<typeof reducer>;