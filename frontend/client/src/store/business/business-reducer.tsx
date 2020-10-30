import { produce } from "immer";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, BusinessLocation, Coordinate, Status } from "../../api/kb-types";
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

export const initialState: BusinessState = {
    business: {
        business_name: "",
        business_email: "",
        description: "",
    },
    businesses: [],
    businessLocation: {
        business_name: "",
        roadAddress: "",
        jibunAddress: "",
        zipcode: "",
        x: "",
        y: "",
    },
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted
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

interface GetBusinessLocationAction {
    type: BusinessActionType.GetBusinessLocation;
}

interface GetBusinessLocationSuccessAction {
    type: BusinessActionType.GetBusinessLocationSuccess;
    businessLocation: BusinessLocation;
}

interface GetBusinessLocationFailAction {
    type: BusinessActionType.GetBusinessLocationFail;
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

interface UpdateBusinessLocationAction {
    type: BusinessActionType.UpdateBusinessLocation;
}

interface UpdateBusinessLocationSuccessAction {
    type: BusinessActionType.UpdateBusinessLocationSuccess;
    businessLocation: BusinessLocation;
}

interface UpdateBusinessLocationFailAction {
    type: BusinessActionType.UpdateBusinessLocationFail;
}

type Action =   
    | GetBusinessAction 
    | GetBusinessSuccessAction 
    | GetBusinessFailAction 
    | GetBusinessListAction 
    | GetBusinessListSuccessAction 
    | GetBusinessListFailAction 
    | GetBusinessLocationAction 
    | GetBusinessLocationSuccessAction 
    | GetBusinessLocationFailAction 
    | CreateBusinessAction 
    | CreateBusinessSuccessAction 
    | CreateBusinessFailAction 
    | CreateBusinessLocationAction 
    | CreateBusinessLocationSuccessAction 
    | CreateBusinessLocationFailAction 
    | UpdateBusinessAction 
    | UpdateBusinessSuccessAction 
    | UpdateBusinessFailAction 
    | UpdateBusinessLocationAction 
    | UpdateBusinessLocationSuccessAction 
    | UpdateBusinessLocationFailAction 

export const reducer = (
    state: BusinessState = initialState,
    action: Action
): BusinessState => {
    switch(action.type) {
        case BusinessActionType.GetBusiness:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.GetBusinessSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.business = action.business;
            });
        case BusinessActionType.GetBusinessFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case BusinessActionType.GetBusinessList:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.GetBusinessListSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.businesses = action.businesses;
            });
        case BusinessActionType.GetBusinessListFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case BusinessActionType.GetBusinessLocation:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.GetBusinessLocationSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.businessLocation = action.businessLocation;
            });
        case BusinessActionType.GetBusinessLocationFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
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
        case BusinessActionType.UpdateBusiness:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.UpdateBusinessSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.business = action.business;
            });
        case BusinessActionType.UpdateBusinessFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case BusinessActionType.UpdateBusinessLocation:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case BusinessActionType.UpdateBusinessLocationSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.businessLocation = action.businessLocation;
            });
        case BusinessActionType.UpdateBusinessLocationFail:
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
): Promise<Business> => {
    dispatch({
        type: BusinessActionType.CreateBusiness,
    });
    return api.createBusiness(userId, business).then(business => {
        dispatch({
            type: BusinessActionType.CreateBusinessSuccess,
            business: business
        })
        return business
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

export const updateBusiness = (
    api: KouponBankApi,
    userId: string,
    businessId: string,
    business: Business,
    dispatch: Dispatch,
): Promise<Business> => {
    dispatch({
        type: BusinessActionType.UpdateBusiness,
    });
    return api.updateBusiness(userId, businessId, business).then(business => {
        dispatch({
            type: BusinessActionType.UpdateBusinessSuccess,
            business: business
        })
        return business
    }).catch(err => {
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

export const createBusinessLocation = (
    api: KouponBankApi,
    businessId: string,
    businessName: string,
    latlng: Coordinate,
    businessLocation: BusinessLocation,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: BusinessActionType.CreateBusinessLocation,
    });
    return api.createBusinessLocation(
        businessId,
        businessName,
        latlng,
        businessLocation
    ).then(businessLocation => {
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

export const updateBusinessLocation = (
    api: KouponBankApi,
    businessId: string,
    businessName: string,
    latlng: Coordinate,
    businessLocation: BusinessLocation,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: BusinessActionType.UpdateBusinessLocation,
    });
    return api.updateBusinessLocation(
        businessId,
        businessName,
        latlng,
        businessLocation
    ).then(businessLocation => {
        dispatch({
            type: BusinessActionType.UpdateBusinessLocationSuccess,
            businessLocation: businessLocation,
        })
    }).catch(err => {
        dispatch({
            type: BusinessActionType.UpdateBusinessLocationFail,
        });
        dispatch({
            type: AlertsActionType.DisplayError,
            header: "ERROR",
            body: "다시 시도해 주세요",
        } as DisplayError);
        throw err;
    });
};

export const getBusinesses = (
    api: KouponBankApi,
    dispatch: Dispatch,
): Promise<Business[]> => {
    dispatch({
        type: BusinessActionType.GetBusinessList,
    });
    return api.getBusinesses().then(businesses => {
        dispatch({
            type: BusinessActionType.GetBusinessListSuccess,
            businesses: businesses,
        })
        return businesses;
    }).catch(err => {
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
}

export const getMyBusinesses = (
    api: KouponBankApi,
    userId: string,
    dispatch: Dispatch,
): Promise<Business[]> => {
    dispatch({
        type: BusinessActionType.GetBusinessList,
    });
    return api.getMyBusinesses(userId).then(businesses => {
        dispatch({
            type: BusinessActionType.GetBusinessListSuccess,
            businesses: businesses,
        })
        return businesses;
    }).catch(err => {
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
}
