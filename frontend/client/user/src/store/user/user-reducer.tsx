import { produce } from "immer";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Status, User, UserDetail } from "../../api/kb-types";
import { AlertsActionType } from "../notification/action-type";
import { DisplayError } from "../notification/notification-reducer";
import { UserActionType } from "./action-type";

/**
 * 프로젝트 Global Variable State 트래킹
 * 파일들이 필요한 Props들이 저장된 'KouponBankState' Dictionary
 * Reducer이 정상적으로 돌아갈려면 필요한 아주 중요한 Interface.
 */

export interface UserState {
    user: User;
    fetchStatus: Status;
    updateStatus: Status;
}

const initialState: UserState = {
    user: {
        user_detail: {
            name: "",
            gender: "",
            birthday: "",
            address: "",
            cell_number: "",
            user_picture: null,
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

interface CreateNewUserAction {
    type: UserActionType.CreateNewUserAction;
}

interface CreateNewUserSuccessAction {
    user: User;
    type: UserActionType.CreateNewUserSuccessAction;
}

interface CreateNewUserFailAction {
    type: UserActionType.CreateNewUserFailAction;
}

interface LoginUserAction {
    type: UserActionType.LoginUserAction;
}

interface LoginUserSuccessAction {
    user: User;
    type: UserActionType.LoginUserSucessAction;
}

interface LoginUserFailAction {
    type: UserActionType.LoginUserFailAction;
}

interface UpdateUserDetailAction {
    type: UserActionType.UpdateUserDetailAction;
}

interface UpdateUserDetailSuccessAction {
    user: User;
    type: UserActionType.UpdateUserDetailSuccessAction;
}

interface UpdateUserDetailFailAction {
    type: UserActionType.UpdateUserDetailFailAction;
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
    | UpdateUserDetailAction
    | UpdateUserDetailSuccessAction
    | UpdateUserDetailFailAction;

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
                draftState.user = action.user;
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
                draftState.user = action.user;
            });
        case UserActionType.LoginUserFailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case UserActionType.UpdateUserDetailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case UserActionType.UpdateUserDetailSuccessAction:
            return produce(state, (draftState) => {
                draftState.user = action.user;
            });
        case UserActionType.UpdateUserDetailFailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
};

export const loginUser = async (
    api: KouponBankApi,
    user: User,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: UserActionType.LoginUserAction,
    });
    return api
        .loginUser(user)
        .then((user) => {
            dispatch({
                type: UserActionType.LoginUserSucessAction,
                user: user,
            });
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

// Creates a new user and returns the user's information.
export const createNewUser = async (
    api: KouponBankApi,
    user: User,
    userDetail: UserDetail,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: UserActionType.CreateNewUserAction,
    });
    return api
        .createUser(user, userDetail)
        .then((user) => {
            dispatch({
                type: UserActionType.CreateNewUserSuccessAction,
                user: user,
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

export const updateUserDetail = async (
    api: KouponBankApi,
    id: string,
    userDetail: UserDetail,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: UserActionType.UpdateUserDetailAction,
    });
    return api
        .updateUserDetail(id, userDetail)
        .then((user) => {
            dispatch({
                type: UserActionType.UpdateUserDetailSuccessAction,
                user: user,
            });
        })
        .catch(() => {
            dispatch({
                type: UserActionType.UpdateUserDetailFailAction,
            });
        });
};
