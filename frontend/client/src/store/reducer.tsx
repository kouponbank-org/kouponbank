import { combineReducers } from 'redux';
import { reducer as notificationReducer } from "./notification/notification-reducer";
import { reducer as userReducer } from "./user/user-reducer";
import { reducer as userDetailReducer } from "./user/user-detail-reducer";
export const reducer = combineReducers({
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    userDetailReducer: userDetailReducer,
});

export type RootReducer = ReturnType<typeof reducer>;