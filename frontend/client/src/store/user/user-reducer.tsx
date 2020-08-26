import { produce } from "immer";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";
import { UserActionType } from "./action-type";

// 액션 Status 트래킹 Enum.
export enum Status {
    NotStarted="NOT_STARTED",
    Running="RUNNING",
    Succeeded="SUCCEEDED",
    Failed="FAILED",
}

/**
 * 프로젝트 Global Variable State 트래킹
 * 파일들이 필요한 Props들이 저장된 'KouponBankState' Dictionary
 * Reducer이 정상적으로 돌아갈려면 필요한 아주 중요한 Interface. 
 */ 

export interface userState {
    user: User;
    fetchStatus: Status;
    updateStatus: Status;
}

const initialState: userState = {
    user: {
        username: "",
        password: "",
        email: "",
    },
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted
};

/**
 * 우리 Reducer가 사용하는 액션들을 설정하는 공간
 */

interface CreateNewUserAction {
    type: UserActionType.CreateNewUserAction
}

interface CreateNewUserSuccessAction {
    user: User;
    type: UserActionType.CreateNewUserSuccessAction
}

interface CreateNewUserFailAction {
    type: UserActionType.CreateNewUserFailAction
}

/**
 * Reducer가 활성화 될려면 필요한 "Action" 하고 "State" Declaration.
 * "State"은 전에 "KouponBankState"로 설정하였고
 * 이제 우리가 사용할 "Action"들을 설정할시간  
 */
type Action =   CreateNewUserAction |
                CreateNewUserSuccessAction |
                CreateNewUserFailAction;

/**
 * Reducer가 필요한 Parameters "state"하고 "action"
 * @param state 
 * @param action 
 * Reducer가 우리 Global State을 업데이트 시켜준다
 */
export const reducer = (
    state: userState = initialState,
    action: Action
): userState => {
    switch(action.type) {
        case UserActionType.CreateNewUserAction:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case UserActionType.CreateNewUserSuccessAction: {
            return produce(state, draftState => {
                draftState.user = action.user
            })
        }
        case UserActionType.CreateNewUserFailAction: {
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        }
        default:
            return state;
    }
  };

// 새로운 유저를 생성하기 위한 API Call + Reducer State Update
export const createNewUser = (
        api: KouponBankApi,
        username: string,
        password: string | number,
        email: string | number,
        dispatch
    ): any => {
        dispatch({
            type: UserActionType.CreateNewUserAction,
        });
        return api.createUser(username, password, email).then(user => {
            dispatch({
                type: UserActionType.CreateNewUserSuccessAction,
                user: user
            })
        }).catch(err => {
            dispatch({
                type: UserActionType.CreateNewUserFailAction
            });
        });
    };

