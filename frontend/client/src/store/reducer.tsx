import { combineReducers, Dispatch } from "redux";
import storage from "redux-persist/lib/storage";
import { reducer as businessReducer } from "./business/business-reducer";
import { CommonActionType } from "./common-action-type";
import { reducer as couponReducer } from "./coupon/coupon-reducer";
import { reducer as naverMapReducer } from "./naver-map/naver-map-reducer";
import { reducer as notificationReducer } from "./notification/notification-reducer";
import { reducer as userDetailReducer } from "./user/user-detail-reducer";
import { reducer as userReducer } from "./user/user-reducer";

const reducer = combineReducers({
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    userDetailReducer: userDetailReducer,
    businessReducer: businessReducer,
    naverMapReducer: naverMapReducer,
    couponReducer: couponReducer,
});
export const mainReducer = (state, action) => {
    if (action.type === CommonActionType.SignOutAction) {
        storage.removeItem("persist:root").catch(() => {
            // does nothing
        });
        state = undefined;
    }

    return reducer(state, action);
};

export const signOut = (dispatch: Dispatch): void => {
    dispatch({
        type: CommonActionType.SignOutAction,
    });
};

export type RootReducer = ReturnType<typeof reducer>;
