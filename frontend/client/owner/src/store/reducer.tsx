import { combineReducers, Dispatch } from "redux";
import storage from "redux-persist/lib/storage";
import { reducer as businessReducer } from "./business/business-reducer";
import { CommonActionType } from "./common-action-type";
import { reducer as couponReducer } from "./coupon/coupon-reducer";
import { reducer as naverMapReducer } from "./naver-map/naver-map-reducer";
import { reducer as notificationReducer } from "./notification/notification-reducer";
import { reducer as ownerDetailReducer } from "./owner/owner-detail-reducer";
import { reducer as ownerReducer } from "./owner/owner-reducer";

const reducer = combineReducers({
    ownerReducer: ownerReducer,
    notificationReducer: notificationReducer,
    ownerDetailReducer: ownerDetailReducer,
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
