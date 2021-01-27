import { produce } from "immer";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Owner, OwnerDetail, Status } from "../../api/kb-types";
import { AlertsActionType } from "../notification/action-type";
import { DisplayError } from "../notification/notification-reducer";
import { OwnerActionType } from "./action-type";

/**
 * 프로젝트 Global Variable State 트래킹
 * 파일들이 필요한 Props들이 저장된 'KouponBankState' Dictionary
 * Reducer이 정상적으로 돌아갈려면 필요한 아주 중요한 Interface.
 */

export interface OwnerState {
    owner: Owner;
    fetchStatus: Status;
    updateStatus: Status;
}

const initialState: OwnerState = {
    owner: {
        owner_detail: {
            name: "",
            gender: "",
            birthday: "",
            address: "",
            cell_number: "",
            owner_picture: null,
        },
        username: "",
        password: "",
        email: "",
    },
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted,
};

/**
 * 우리 Reducer가 사용하는 액션들을 설정하는 공간
 */

interface CreateNewOwnerAction {
    type: OwnerActionType.CreateNewOwnerAction;
}

interface CreateNewOwnerSuccessAction {
    owner: Owner;
    type: OwnerActionType.CreateNewOwnerSuccessAction;
}

interface CreateNewOwnerFailAction {
    type: OwnerActionType.CreateNewOwnerFailAction;
}

interface LoginOwnerAction {
    type: OwnerActionType.LoginOwnerAction;
}

interface LoginOwnerSuccessAction {
    owner: Owner;
    type: OwnerActionType.LoginOwnerSucessAction;
}

interface LoginOwnerFailAction {
    type: OwnerActionType.LoginOwnerFailAction;
}

interface UpdateOwnerDetailAction {
    type: OwnerActionType.UpdateOwnerDetailAction;
}

interface UpdateOwnerDetailSuccessAction {
    owner: Owner;
    type: OwnerActionType.UpdateOwnerDetailSuccessAction;
}

interface UpdateOwnerDetailFailAction {
    type: OwnerActionType.UpdateOwnerDetailFailAction;
}

/**
 * Reducer가 활성화 될려면 필요한 "Action" 하고 "State" Declaration.
 * "State"은 전에 "KouponBankState"로 설정하였고
 * 이제 우리가 사용할 "Action"들을 설정할시간
 */
export type Action =
    | CreateNewOwnerAction
    | CreateNewOwnerSuccessAction
    | CreateNewOwnerFailAction
    | LoginOwnerAction
    | LoginOwnerSuccessAction
    | LoginOwnerFailAction
    | UpdateOwnerDetailAction
    | UpdateOwnerDetailSuccessAction
    | UpdateOwnerDetailFailAction;
/**
 * Reducer가 필요한 Parameters "state"하고 "action"
 * @param state
 * @param action
 * Reducer가 우리 Global State을 업데이트 시켜준다
 */
export const reducer = (state: OwnerState = initialState, action: Action): OwnerState => {
    switch (action.type) {
        case OwnerActionType.CreateNewOwnerAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case OwnerActionType.CreateNewOwnerSuccessAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.owner = action.owner;
            });
        case OwnerActionType.CreateNewOwnerFailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case OwnerActionType.LoginOwnerAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case OwnerActionType.LoginOwnerSucessAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.owner = action.owner;
            });
        case OwnerActionType.LoginOwnerFailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case OwnerActionType.UpdateOwnerDetailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case OwnerActionType.UpdateOwnerDetailSuccessAction:
            return produce(state, (draftState) => {
                draftState.owner = action.owner;
            });
        case OwnerActionType.UpdateOwnerDetailFailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
};

// 새로운 유저를 생성하기 위한 API Call + Reducer State Update
export const createNewOwner = async (
    api: KouponBankApi,
    owner: Owner,
    ownerDetail: OwnerDetail,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: OwnerActionType.CreateNewOwnerAction,
    });
    return api
        .createOwner(owner, ownerDetail)
        .then((owner) => {
            dispatch({
                type: OwnerActionType.CreateNewOwnerSuccessAction,
                owner: owner,
            });
        })
        .catch((err) => {
            dispatch({
                type: OwnerActionType.CreateNewOwnerFailAction,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
};

export const loginOwner = async (
    api: KouponBankApi,
    owner: Owner,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: OwnerActionType.LoginOwnerAction,
    });
    return api
        .loginOwner(owner)
        .then((owner) => {
            dispatch({
                type: OwnerActionType.LoginOwnerSucessAction,
                owner: owner,
            });
        })
        .catch((err) => {
            dispatch({
                type: OwnerActionType.LoginOwnerFailAction,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
};

export const updateOwnerDetail = async (
    api: KouponBankApi,
    id: string,
    ownerDetail: OwnerDetail,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: OwnerActionType.UpdateOwnerDetailAction,
    });
    return api
        .updateOwnerDetail(id, ownerDetail)
        .then((owner) => {
            dispatch({
                type: OwnerActionType.UpdateOwnerDetailSuccessAction,
                owner: owner,
            });
        })
        .catch(() => {
            dispatch({
                type: OwnerActionType.UpdateOwnerDetailFailAction,
            });
        });
};