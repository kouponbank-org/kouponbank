import { produce } from "immer";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Business, BusinessFilterDetail, Status } from "../../api/kb-types";
import { AlertsActionType } from "../notification/action-type";
import { DisplayError } from "../notification/notification-reducer";
import { BusinessActionType } from "./action-type";

export interface BusinessState {
    business: Business;
    businesses: Business[];
    searchedBusinesses: Business[];
    fetchStatus: Status;
    updateStatus: Status;
}

export const initialState: BusinessState = {
    business: {
        business_address: {
            roadAddr: "",
            jibunAddr: "",
            zipNo: "",
            entX: "",
            entY: "",
        },
        business_detail: {
            business_email: "",
            business_wifi: false,
        },
        business_name: "",
        business_number: "",
        business_description: "",
    },
    businesses: [],
    searchedBusinesses: [],
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted,
};

interface GetBusinessAction {
    type: BusinessActionType.GetBusiness;
}

interface GetBusinessSuccessAction {
    type: BusinessActionType.GetBusinessSuccess;
    business: Business;
}

interface GetBusinessFailAction {
    type: BusinessActionType.GetBusinessFail;
}

interface GetBusinessListAction {
    type: BusinessActionType.GetBusinessList;
}

interface GetBusinessListSuccessAction {
    type: BusinessActionType.GetBusinessListSuccess;
    businesses: Business[];
}

interface GetBusinessListFailAction {
    type: BusinessActionType.GetBusinessListFail;
}

interface GetBusinessFromSearchAction {
    type: BusinessActionType.GetBusinessesFromSearch;
}

interface GetBusinessFromSearchActionSuccess {
    type: BusinessActionType.GetBusinessesFromSearchSuccess;
    searchedBusinesses: Business[];
}

interface GetBusinessFromSearchActionFail {
    type: BusinessActionType.GetBusinessesFromSearchFail;
}

export type Action =
    | GetBusinessAction
    | GetBusinessSuccessAction
    | GetBusinessFailAction
    | GetBusinessListAction
    | GetBusinessListSuccessAction
    | GetBusinessListFailAction
    | GetBusinessFromSearchAction
    | GetBusinessFromSearchActionSuccess
    | GetBusinessFromSearchActionFail;

export const reducer = (state: BusinessState = initialState, action: Action): BusinessState => {
    switch (action.type) {
        case BusinessActionType.GetBusiness:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.GetBusinessSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.business = action.business;
            });
        case BusinessActionType.GetBusinessFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case BusinessActionType.GetBusinessList:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.GetBusinessListSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.businesses = action.businesses;
            });
        case BusinessActionType.GetBusinessListFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case BusinessActionType.GetBusinessesFromSearch:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.GetBusinessesFromSearchSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.searchedBusinesses = action.searchedBusinesses;
            });
        case BusinessActionType.GetBusinessesFromSearchFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
};

export const getBusinesses = async (
    api: KouponBankApi,
    dispatch: Dispatch,
): Promise<Business[]> => {
    dispatch({
        type: BusinessActionType.GetBusinessList,
    });
    return api
        .getBusinesses()
        .then((businesses) => {
            dispatch({
                type: BusinessActionType.GetBusinessListSuccess,
                businesses: businesses,
            });
            return businesses;
        })
        .catch((err) => {
            dispatch({
                type: BusinessActionType.GetBusinessListFail,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
};

export const getBusiness = async (
    api: KouponBankApi,
    businessId: string,
    dispatch: Dispatch,
): Promise<Business> => {
    dispatch({
        type: BusinessActionType.GetBusiness,
    });
    return api
        .getBusiness(businessId)
        .then((business) => {
            dispatch({
                type: BusinessActionType.GetBusinessSuccess,
                business: business,
            });
            return business;
        })
        .catch((err) => {
            dispatch({
                type: BusinessActionType.GetBusinessFail,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
};

export const getBusinessesFromSearch = async (
    api: KouponBankApi,
    businessFilterDetail: BusinessFilterDetail,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: BusinessActionType.GetBusinessesFromSearch,
    });
    return api
        .getBusinessesFromSearch(businessFilterDetail)
        .then((searchedBusinesses) => {
            dispatch({
                type: BusinessActionType.GetBusinessesFromSearchSuccess,
                searchedBusinesses: searchedBusinesses,
            });
        })
        .catch((err) => {
            dispatch({
                type: BusinessActionType.GetBusinessesFromSearchFail,
            });
            throw err;
        });
};
