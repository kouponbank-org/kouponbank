// React-Redux-Store Components
import { produce } from "immer";
import { ActionType } from "./action-type";

// Koupon Bank Frontend Components

// API Components
import { KouponBankApi } from "../api/kb-api";
import { User } from "../api/kb-types";

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

export interface KouponBankState {
    user: User;
    roomId: number;
    userId: number;
    fetchStatus: Status;
    updateStatus: Status;
}

/**
 * 우리 Reducer가 사용하는 액션들을 설정하는 공간
 */

interface CreateNewUserAction {
    type: ActionType.CreateNewUserAction
}

interface CreateNewUserSuccessAction {
    user: User;
    type: ActionType.CreateNewUserSuccessAction
}

interface CreateNewUserFailAction {
    type: ActionType.CreateNewUserFailAction
}

/**
 * 나중에 다른파일들이나 API Call할때 필요할 수 있으니
 * 우리가 사용하는 액션들을 'Actions'라는 Dictionary에 추가하는 공간
 */
export interface Actions {
    CreateNewUserAction: CreateNewUserAction
    CreateNewUserSuccessAction: CreateNewUserSuccessAction
    CreateNewUserFailAction: CreateNewUserFailAction
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
    state: KouponBankState = {
        user: null,
        roomId: null,
        userId: null,
        fetchStatus: Status.NotStarted,
        updateStatus: Status.NotStarted,
    }, action: Action
): KouponBankState => {
    switch(action.type) {
        case ActionType.CreateNewUserAction:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case ActionType.CreateNewUserSuccessAction: {
            return produce(state, draftState => {
                draftState.user = action.user
            })
        }
        case ActionType.CreateNewUserFailAction: {
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        }
        default:
            return state;
    }
  };

// 새로운 유저를 생성하기 위한 API Call + Reducer State Update
export const createNewUser = (api: KouponBankApi, username: string, userPassword: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.CreateNewUserAction,
        } as CreateNewUserAction);
        api.createUser(username, userPassword).then(user => {
            dispatch({
                type: ActionType.CreateNewUserSuccessAction,
                user: user
            })
        }).catch(err => {
            dispatch({
                type: ActionType.CreateNewUserFailAction
            } as CreateNewUserFailAction);
        })
    };
};

