import { produce } from "immer";
import { ActionType } from "./action-type";
import { KouponBankApi } from "../api/kb-api";
import { User } from "../api/kb-types";

export interface RoomState {
    user: User;
    roomId: number;
    userId: number;
}

interface SetUserAction {
    user: User;
    type: ActionType.SetUserAction
}

interface SetRoomAction {
    type: ActionType.SetRoomAction
}

export interface Actions {
    SetUser: SetUserAction
    SetRoom: SetRoomAction
}

type Action =   SetUserAction |
                SetRoomAction;

export const reducer = (
    state: RoomState = {
        user: null,
        roomId: null,
        userId: null,
    }, action: Action
): RoomState => {
    switch(action.type) {
        case ActionType.SetUserAction:
            return produce(state, draftState => {
                draftState.user = action.user
            })
        case ActionType.SetRoomAction:
            return produce(state, draftState => {

            })
        default:
            return state;
    }
  };

export const getUserAction = (api: KouponBankApi, userId: number): any => {
    return (dispatch): any => {
        api.getUser(userId).then(user => {
            dispatch({
                type: ActionType.SetUserAction,
                user: user
            } as SetUserAction);
        }).catch(err => {

        });
    };
};

