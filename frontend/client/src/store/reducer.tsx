import { combineReducers } from 'redux';
import { reducer as businessReducer } from "./business/business-reducer";
import { reducer as naverMapReducer } from "./naver-map/naver-map-reducer";
import { reducer as notificationReducer } from "./notification/notification-reducer";
import { reducer as userDetailReducer } from "./user/user-detail-reducer";
import { reducer as userReducer } from "./user/user-reducer";
import { reducer as couponReducer } from "./coupon/coupon-reducer";

export const reducer = combineReducers({
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    userDetailReducer: userDetailReducer,
    businessReducer: businessReducer,
    naverMapReducer: naverMapReducer,
    couponReducer: couponReducer,
});

export type RootReducer = ReturnType<typeof reducer>;