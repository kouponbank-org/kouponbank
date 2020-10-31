import produce from "immer";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { AddressDetail, BusinessLocation, NaverMapBound, Status } from "../../api/kb-types";
import { NaverMapActionType } from "./action-type";

export interface NaverMapState {
    naverMapBound: NaverMapBound;
    businessLocations: BusinessLocation[];
    fetchStatus: Status;
    updateStatus: Status;
}

const initialState: NaverMapState = {
    naverMapBound: {
        maxLat: "",
        minLat: "",
        maxLng: "",
        minLng: "",
    },
    businessLocations: [],
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted,
};

interface NaverMapBoundChangeAction {
    type: NaverMapActionType.NaverMapBoundChange;
}

interface NaverMapBoundChangeSucessAction {
    type: NaverMapActionType.NaverMapBoundChangeSuccess;
    naverMapBound: NaverMapBound;
}

interface NaverMapBoundChangeFailAction {
    type: NaverMapActionType.NaverMapBoundChangeFail;
}

interface GetAllBusinessWithinNaverMapBoundsAction {
    type: NaverMapActionType.GetAllBusinessWithinNaverMapBounds;
}

interface GetAllBusinessWithinNaverMapBoundsSuccessAction {
    type: NaverMapActionType.GetAllBusinessWithinNaverMapBoundsSuccess;
    businessLocations: BusinessLocation[];
}

interface GetAllBusinessWithinNaverMapBoundsFailAction {
    type: NaverMapActionType.GetAllBusinessWithinNaverMapBoundsFail;
}

type Action =
    | NaverMapBoundChangeAction
    | NaverMapBoundChangeSucessAction
    | NaverMapBoundChangeFailAction
    | GetAllBusinessWithinNaverMapBoundsAction
    | GetAllBusinessWithinNaverMapBoundsSuccessAction
    | GetAllBusinessWithinNaverMapBoundsFailAction;

export const reducer = (state: NaverMapState = initialState, action: Action): NaverMapState => {
    switch (action.type) {
        case NaverMapActionType.NaverMapBoundChange:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case NaverMapActionType.NaverMapBoundChangeSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.naverMapBound = action.naverMapBound;
            });
        case NaverMapActionType.NaverMapBoundChangeFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case NaverMapActionType.GetAllBusinessWithinNaverMapBounds:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case NaverMapActionType.GetAllBusinessWithinNaverMapBoundsSuccess:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.businessLocations = action.businessLocations;
            });
        case NaverMapActionType.GetAllBusinessWithinNaverMapBoundsFail:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
};

export const naverMapBoundChanged = (naverMapBound: NaverMapBound, dispatch: Dispatch): void => {
    dispatch({
        type: NaverMapActionType.NaverMapBoundChangeSuccess,
        naverMapBound: naverMapBound,
    });
};

export const getAllBusinessWithinNaverMapBounds = async (
    api: KouponBankApi,
    naverMapBound: NaverMapBound,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: NaverMapActionType.GetAllBusinessWithinNaverMapBounds,
    });
    return api
        .getAllBusinessWithinNaverMapBounds(naverMapBound)
        .then((businessLocations) => {
            dispatch({
                type: NaverMapActionType.GetAllBusinessWithinNaverMapBoundsSuccess,
                businessLocations: businessLocations,
            });
        })
        .catch((err) => {
            dispatch({
                type: NaverMapActionType.GetAllBusinessWithinNaverMapBoundsFail,
            });
            throw err;
        });
};

export const getJusoSearchResult = async (
    api: KouponBankApi,
    address: string,
): Promise<AddressDetail[]> => {
    return api.findAddress(address).then((address) => {
        return address;
    });
};
