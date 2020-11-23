import { produce } from "immer";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { OwnerDetail, Status } from "../../api/kb-types";
import { UserActionType } from "./action-type";
/**
 * 프로젝트 Global Variable State 트래킹
 * 파일들이 필요한 Props들이 저장된 'KouponBankState' Dictionary
 * Reducer이 정상적으로 돌아갈려면 필요한 아주 중요한 Interface.
 */

export interface userDetailState {
    ownerDetail: OwnerDetail;
    fetchStatus: Status;
    updateStatus: Status;
}

//Frontend initial state --> not needed.
const initialState: userDetailState = {
    ownerDetail: {
        name: "",
        gender: "",
        birthday: "",
        location: "",
        profile_picture: null,
    },
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted,
};

/**
 * 우리 Reducer가 사용하는 액션들을 설정하는 공간
 */
interface GetUserDetailAction {
    type: UserActionType.GetUserDetailAction;
}

interface GetUserDetailSuccessAction {
    ownerDetail: OwnerDetail;
    type: UserActionType.GetUserDetailSuccessAction;
}

interface GetUserDetailFailAction {
    type: UserActionType.GetUserDetailFailAction;
}

interface UpdateUserDetailAction {
    type: UserActionType.UpdateUserDetailAction;
}

interface UpdateUserDetailSuccessAction {
    ownerDetail: OwnerDetail;
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
    | UpdateUserDetailAction
    | UpdateUserDetailSuccessAction
    | UpdateUserDetailFailAction
    | GetUserDetailAction
    | GetUserDetailSuccessAction
    | GetUserDetailFailAction;

/**
 * Reducer가 필요한 Parameters "state"하고 "action"
 * @param state
 * @param action
 * Reducer가 우리 Global State을 업데이트 시켜준다
 */
export const reducer = (state: userDetailState = initialState, action: Action): userDetailState => {
    switch (action.type) {
        case UserActionType.GetUserDetailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case UserActionType.GetUserDetailSuccessAction:
            return produce(state, (draftState) => {
                draftState.ownerDetail = action.ownerDetail;
            });
        case UserActionType.GetUserDetailFailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        case UserActionType.UpdateUserDetailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Running;
            });
        case UserActionType.UpdateUserDetailSuccessAction:
            return produce(state, (draftState) => {
                draftState.ownerDetail = action.ownerDetail;
            });
        case UserActionType.UpdateUserDetailFailAction:
            return produce(state, (draftState) => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
};

// 유저 (사업자) 디테일을 업데이트 하기 위한 API Call + Reducer State Update
export const updateOwnerDetail = async (
    api: KouponBankApi,
    id: string,
    ownerDetail: OwnerDetail,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: UserActionType.UpdateUserDetailAction,
    });
    return api
        .updateOwnerDetail(id, ownerDetail)
        .then((ownerDetail) => {
            dispatch({
                type: UserActionType.UpdateUserDetailSuccessAction,
                ownerDetail: ownerDetail,
            });
        })
        .catch(() => {
            dispatch({
                type: UserActionType.UpdateUserDetailFailAction,
            });
        });
};

export const getOwnerDetail = async (
    api: KouponBankApi,
    userId: string,
    dispatch: Dispatch,
): Promise<void> => {
    dispatch({
        type: UserActionType.GetUserDetailAction,
    });
    return api
        .getOwnerDetail(userId)
        .then((ownerDetail) => {
            dispatch({
                type: UserActionType.GetUserDetailSuccessAction,
                ownerDetail: ownerDetail,
            });
        })
        .catch(() => {
            dispatch({
                type: UserActionType.GetUserDetailFailAction,
            });
        });
};