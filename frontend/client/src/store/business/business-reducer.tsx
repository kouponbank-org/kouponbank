import { produce } from "immer";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, BusinessLocation, Status } from "../../api/kb-types";
import { AlertsActionType } from "../notification/action-type";
import { DisplayError } from "../notification/notification-reducer";
import { BusinessActionType } from "./action-type";

export interface BusinessState {
    business: Business;
    businesses: Business[];
    businessLocation: BusinessLocation;
    fetchStatus: Status;
    updateStatus: Status;
}

const initialState: BusinessState = {
    business: {
        business_name: "",
        business_email: "",
        description: "",
    },
    businesses: [],
    businessLocation: {
        business_name: "",
        doromyeong: "",
        jibeon: "",
        postal_code: "",
        x: "",
        y: "",
    },
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted
};

interface CreateBusinessAction {
    type: BusinessActionType.CreateBusiness;
}

interface CreateBusinessSuccessAction {
    type: BusinessActionType.CreateBusinessSuccess;
    business: Business;
}

interface CreateBusinessFailAction {
    type: BusinessActionType.CreateBusinessFail;
}

interface CreateBusinessLocationAction {
    type: BusinessActionType.CreateBusinessLocation;
}

interface CreateBusinessLocationSuccessAction {
    type: BusinessActionType.CreateBusinessLocationSuccess;
    businessLocation: BusinessLocation;
}

interface CreateBusinessLocationFailAction {
    type: BusinessActionType.CreateBusinessLocationFail;
}

type Action =   
    | CreateBusinessAction 
    | CreateBusinessSuccessAction 
    | CreateBusinessFailAction 
    | CreateBusinessLocationAction 
    | CreateBusinessLocationSuccessAction 
    | CreateBusinessLocationFailAction 

export const reducer = (
    state: BusinessState = initialState,
    action: Action
): BusinessState => {
    switch(action.type) {
        case BusinessActionType.CreateBusiness:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.CreateBusinessSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.business = action.business;
            });
        case BusinessActionType.CreateBusinessFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case BusinessActionType.CreateBusinessLocation:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.CreateBusinessLocationSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.businessLocation = action.businessLocation;
            });
        case BusinessActionType.CreateBusinessLocationFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
};

export const createBusiness = (
    api: KouponBankApi,
    userId: string,
    business: Business,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: BusinessActionType.CreateBusiness,
    });
    return api.createBusiness(userId, business).then(business => {
        dispatch({
            type: BusinessActionType.CreateBusinessSuccess,
            business: business
        })
    }).catch(err => {
        dispatch({
            type: BusinessActionType.CreateBusinessFail,
        });
        dispatch({
            type: AlertsActionType.DisplayError,
            header: "ERROR",
            body: "다시 시도해 주세요",
        } as DisplayError);
        throw err;
    });
};

export const createBusinessLocation = (
    api: KouponBankApi,
    businessLocation: BusinessLocation,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: BusinessActionType.CreateBusinessLocation,
    });
    return api.createBusinessLocation(businessLocation).then(businessLocation => {
        dispatch({
            type: BusinessActionType.CreateBusinessLocationSuccess,
            businessLocation: businessLocation,
        })
    }).catch(err => {
        dispatch({
            type: BusinessActionType.CreateBusinessLocationFail,
        });
        dispatch({
            type: AlertsActionType.DisplayError,
            header: "ERROR",
            body: "다시 시도해 주세요",
        } as DisplayError);
        throw err;
    });
};
