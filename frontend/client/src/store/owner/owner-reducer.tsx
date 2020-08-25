// React-Redux-Store Components
import { produce } from "immer";
import { OwnerActionType } from "./action-type";

// Koupon Bank Frontend Components

// API Components
import { KouponBankApi } from "../../api/kb-api";
import { Owner } from "../../api/kb-types";

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

export interface ownerState {
    owner: Owner;
    fetchStatus: Status;
    updateStatus: Status;
}

const initialState: ownerState = {
    owner: {
        ownerUsername: "",
        ownerPassword: "",
        ownerEmail: "",
    },
    fetchStatus: Status.NotStarted,
    updateStatus: Status.NotStarted
};

/**
 * 우리 Reducer가 사용하는 액션들을 설정하는 공간
 */

interface CreateNewOwnerAction {
    type: OwnerActionType.CreateNewOwnerAction
}

interface CreateNewOwnerSuccessAction {
    owner: Owner;
    type: OwnerActionType.CreateNewOwnerSuccessAction
}

interface CreateNewOwnerFailAction {
    type: OwnerActionType.CreateNewOwnerFailAction
}

/**
 * Reducer가 활성화 될려면 필요한 "Action" 하고 "State" Declaration.
 * "State"은 전에 "KouponBankState"로 설정하였고
 * 이제 우리가 사용할 "Action"들을 설정할시간  
 */
type Action =   CreateNewOwnerAction |
                CreateNewOwnerSuccessAction |
                CreateNewOwnerFailAction;

/**
 * Reducer가 필요한 Parameters "state"하고 "action"
 * @param state 
 * @param action 
 * Reducer가 우리 Global State을 업데이트 시켜준다
 */
export const reducer = (
    state: ownerState = initialState,
    action: Action
): ownerState => {
    switch(action.type) {
        case OwnerActionType.CreateNewOwnerAction:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case OwnerActionType.CreateNewOwnerSuccessAction: {
            return produce(state, draftState => {
                draftState.owner = action.owner
            })
        }
        case OwnerActionType.CreateNewOwnerFailAction: {
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        }
        default:
            return state;
    }
  };

// 새로운 유저를 생성하기 위한 API Call + Reducer State Update
export const createNewOwner = (
        api: KouponBankApi,
        ownerUsername: string,
        ownerPassword: string | number,
        ownerEmail: string,
        dispatch
    ): any => {
        dispatch({
            type: OwnerActionType.CreateNewOwnerAction,
        });
        return api.createOwner(ownerUsername, ownerPassword, ownerEmail).then(owner => {
            dispatch({
                type: OwnerActionType.CreateNewOwnerSuccessAction,
                owner: owner
            })
        }).catch(err => {
            dispatch({
                type: OwnerActionType.CreateNewOwnerFailAction
            });
        });
    };

