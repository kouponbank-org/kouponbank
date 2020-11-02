import { produce } from "immer";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Coupon, Status } from "../../api/kb-types";
import { AlertsActionType } from "../notification/action-type";
import { DisplayError } from "../notification/notification-reducer";
import { CouponActionType } from "./action-type";

export interface CouponState {
    coupon: Coupon;
    fetchStatus: Status;
    updateStatus: Status;
}

const initialState: CouponState = {
    coupon: {
        coupon_title: "",
        coupon_code: "",
        description: "",
        coupon_picture: "",
    },
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted,
};

interface CreateCouponAction {
    type: CouponActionType.CreateCoupon;
}

interface CreateCouponSuccessAction {
    type: CouponActionType.CreateCouponSuccess;
    coupon: Coupon;
}

interface CreateCouponFailAction {
    type: CouponActionType.CreateCouponFail;
}

interface UpdateCouponAction {
    type: CouponActionType.UpdateCoupon;
}

interface UpdateCouponSuccessAction {
    type: CouponActionType.UpdateCouponSuccess;
    coupon: Coupon;
}

interface UpdateCouponFailAction {
    type: CouponActionType.UpdateCouponFail;
}

// interface SignOutAction {
//     type: UserActionType.SignOutAction;
// }

export type Action =
    | CreateCouponAction
    | CreateCouponSuccessAction
    | CreateCouponFailAction
    | UpdateCouponAction
    | UpdateCouponSuccessAction
    | UpdateCouponFailAction;

/**
 * Reducer가 필요한 Parameters "state"하고 "action"
 * @param state
 * @param action
 * Reducer가 우리 Global State을 업데이트 시켜준다
 */
export const reducer = (state: CouponState = initialState, action: Action): CouponState => {
    switch (action.type) {
        case CouponActionType.CreateCoupon:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case CouponActionType.CreateCouponSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.coupon = action.coupon;
            });
        case CouponActionType.CreateCouponFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
};

export const createCoupon = async (
    api: KouponBankApi,
    userId: string,
    businessId: string,
    coupon: Coupon,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: CouponActionType.CreateCoupon,
    });
    return api
        .createCoupon(userId, businessId, coupon)
        .then((coupon) => {
            dispatch({
                type: CouponActionType.CreateCouponSuccess,
                coupon: coupon,
            });
        })
        .catch((err) => {
            dispatch({
                type: CouponActionType.CreateCouponFail,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
};

export const updateCoupon = async (
    api: KouponBankApi,
    userId: string,
    businessId: string,
    couponId: string,
    coupon: Coupon,
    dispatch: Dispatch,
): Promise<Coupon> => {
    dispatch({
        type: CouponActionType.UpdateCoupon,
    });
    return api
        .updateCoupon(userId, businessId, couponId, coupon)
        .then((coupon) => {
            dispatch({
                type: CouponActionType.UpdateCouponSuccess,
                coupon: coupon,
            });
            return coupon;
        })
        .catch((err) => {
            dispatch({
                type: CouponActionType.UpdateCouponFail,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
};
