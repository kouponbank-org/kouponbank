import { produce } from "immer";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Owner, Status } from "../../api/kb-types";
import { AlertsActionType } from "../notification/action-type";
import { DisplayError } from "../notification/notification-reducer";
import { UserActionType } from "./action-type";

/**
 * 프로젝트 Global Variable State 트래킹
 * 파일들이 필요한 Props들이 저장된 'KouponBankState' Dictionary
 * Reducer이 정상적으로 돌아갈려면 필요한 아주 중요한 Interface.
 */

export interface UserState {
    owner: Owner;
    fetchStatus: Status;
    updateStatus: Status;
}

const initialState: UserState = {
    owner: {
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

interface CreateNewUserAction {
    type: UserActionType.CreateNewUserAction;
}

interface CreateNewUserSuccessAction {
    owner: Owner;
    type: UserActionType.CreateNewUserSuccessAction;
}

interface CreateNewUserFailAction {
    type: UserActionType.CreateNewUserFailAction;
}

interface LoginUserAction {
    type: UserActionType.LoginUserAction;
}

interface LoginUserSuccessAction {
    owner: Owner;
    type: UserActionType.LoginUserSucessAction;
}

interface LoginUserFailAction {
    type: UserActionType.LoginUserFailAction;
}

interface SignOutAction {
    type: UserActionType.SignOutAction;
}

/**
 * Reducer가 활성화 될려면 필요한 "Action" 하고 "State" Declaration.
 * "State"은 전에 "KouponBankState"로 설정하였고
 * 이제 우리가 사용할 "Action"들을 설정할시간
 */
export type Action =
    | CreateNewUserAction
    | CreateNewUserSuccessAction
    | CreateNewUserFailAction
    | LoginUserAction
    | LoginUserSuccessAction
    | LoginUserFailAction
    | SignOutAction;

/**
 * Reducer가 필요한 Parameters "state"하고 "action"
 * @param state
 * @param action
 * Reducer가 우리 Global State을 업데이트 시켜준다
 */
export const reducer = (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
        case UserActionType.CreateNewUserAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case UserActionType.CreateNewUserSuccessAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.owner = action.owner;
            });
        case UserActionType.CreateNewUserFailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case UserActionType.LoginUserAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case UserActionType.LoginUserSucessAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Succeeded;
                draftState.owner = action.owner;
            });
        case UserActionType.LoginUserFailAction:
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
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: UserActionType.CreateNewUserAction,
    });
    return api
        .createOwner(owner)
        .then((owner) => {
            dispatch({
                type: UserActionType.CreateNewUserSuccessAction,
                owner: owner,
                isUser: false,
            });
        })
        .catch((err) => {
            dispatch({
                type: UserActionType.CreateNewUserFailAction,
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
): Promise<Owner> => {
    dispatch({
        type: UserActionType.LoginUserAction,
    });
    return api
        .loginOwner(owner)
        .then((owner) => {
            dispatch({
                type: UserActionType.LoginUserSucessAction,
                owner: owner,
                isUser: false,
            });
            return owner;
        })
        .catch((err) => {
            dispatch({
                type: UserActionType.LoginUserFailAction,
            });
            dispatch({
                type: AlertsActionType.DisplayError,
                header: "ERROR",
                body: "다시 시도해 주세요",
            } as DisplayError);
            throw err;
        });
};