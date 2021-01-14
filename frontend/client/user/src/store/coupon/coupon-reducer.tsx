import { produce } from "immer";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Coupon, Status } from "../../api/kb-types";
import { AlertsActionType } from "../notification/action-type";
import { DisplayError } from "../notification/notification-reducer";
import { CouponActionType } from "./action-type";

export interface CouponState {
    coupon: Coupon;
    coupons: Coupon[];
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
    coupons: [],
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted,
};

interface GetCouponListAction {
    type: CouponActionType.GetCouponList;
}

interface GetCouponListSuccessAction {
    type: CouponActionType.GetCouponListSuccess;
    coupons: Coupon[];
}

interface GetCouponListFailAction {
    type: CouponActionType.GetCouponListFail;
}

export type Action = GetCouponListAction | GetCouponListSuccessAction | GetCouponListFailAction;

export const reducer = (state: CouponState = initialState, action: Action): CouponState => {
    switch (action.type) {
        case CouponActionType.GetCouponList:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case CouponActionType.GetCouponListSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.coupons = action.coupons;
            });
        case CouponActionType.GetCouponListFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
};

export const getCoupons = async (
    api: KouponBankApi,
    businessId: string,
    dispatch: Dispatch,
): Promise<Coupon[]> => {
    dispatch({
        type: CouponActionType.GetCouponList,
    });
    return api
        .getCoupons(businessId)
        .then((coupons) => {
            dispatch({
                type: CouponActionType.GetCouponListSuccess,
                coupons: coupons,
            });
            return coupons;
        })
        .catch((err) => {
            dispatch({
                type: CouponActionType.GetCouponListFail,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
};
