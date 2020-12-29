import { produce } from "immer";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Status } from "../../api/kb-types";
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
        business_name: "",
        business_email: "",
        description: "",
        roadAddr: "",
        jibunAddr: "",
        zipNo: "",
        entX: "",
        entY: "",
        business_picture: null,
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

interface UpdateBusinessAction {
    type: BusinessActionType.UpdateBusiness;
}

interface UpdateBusinessSuccessAction {
    type: BusinessActionType.UpdateBusinessSuccess;
    business: Business;
}

interface UpdateBusinessFailAction {
    type: BusinessActionType.UpdateBusinessFail;
}

interface SetBusinessAction {
    type: BusinessActionType.SetBusiness;
}

interface SetBusinessSuccessAction {
    type: BusinessActionType.SetBusinessSuccess;
    business: Business;
}

interface SetBusinessFailAction {
    type: BusinessActionType.SetBusinessFail;
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
    | CreateBusinessAction
    | CreateBusinessSuccessAction
    | CreateBusinessFailAction
    | UpdateBusinessAction
    | UpdateBusinessSuccessAction
    | UpdateBusinessFailAction
    | SetBusinessAction
    | SetBusinessSuccessAction
    | SetBusinessFailAction
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
        case BusinessActionType.CreateBusiness:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.CreateBusinessSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.business = action.business;
            });
        case BusinessActionType.CreateBusinessFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case BusinessActionType.UpdateBusiness:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.UpdateBusinessSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.business = action.business;
            });
        case BusinessActionType.UpdateBusinessFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case BusinessActionType.SetBusiness:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.SetBusinessSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.business = action.business;
            });
        case BusinessActionType.SetBusinessFail:
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

/* Owner Related Business API Calls */

export const getOwnerBusinesses = async (
    api: KouponBankApi,
    userId: string,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: BusinessActionType.GetBusinessList,
    });
    return api
        .getOwnerBusinesses(userId)
        .then((businesses) => {
            dispatch({
                type: BusinessActionType.GetBusinessListSuccess,
                businesses: businesses,
            });
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

export const createBusiness = async (
    api: KouponBankApi,
    userId: string,
    business: Business,
    dispatch: Dispatch,
): Promise<Business> => {
    dispatch({
        type: BusinessActionType.CreateBusiness,
    });
    return api
        .createBusiness(userId, business)
        .then((business) => {
            dispatch({
                type: BusinessActionType.CreateBusinessSuccess,
                business: business,
            });
            return business;
        })
        .catch((err) => {
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

export const updateBusiness = async (
    api: KouponBankApi,
    userId: string,
    businessId: string,
    business: Business,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: BusinessActionType.UpdateBusiness,
    });
    return api
        .updateBusiness(userId, businessId, business)
        .then((business) => {
            dispatch({
                type: BusinessActionType.UpdateBusinessSuccess,
                business: business,
            });
        })
        .catch((err) => {
            dispatch({
                type: BusinessActionType.UpdateBusinessFail,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
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
        type: BusinessActionType.GetBusinessList,
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
    char: string,
    dispatch: Dispatch,
): Promise<Business[]> => {
    dispatch({
        type: BusinessActionType.GetBusinessesFromSearch,
    });
    return api
        .getBusinessesFromSearch(char)
        .then((searchedBusinesses) => {
            dispatch({
                type: BusinessActionType.GetBusinessesFromSearchSuccess,
                searchedBusinesses: searchedBusinesses,
            });
            return searchedBusinesses;
        })
        .catch((err) => {
            dispatch({
                type: BusinessActionType.GetBusinessesFromSearchFail,
            });
            throw err;
        });
};
