import { produce } from "immer";
import { ActionType } from "./action-type";

export interface RoomState {
    roomId: number;
}

interface SetUserAction {
    type: ActionType.SetUserAction
}

interface SetRoomAction {
    type: ActionType.SetRoomAction
}

export interface Actions {
    SetUserAction: SetUserAction
    SetRoomAction: SetRoomAction
}

type Action =   SetUserAction |
                SetRoomAction;

export const reducer = (
    state: RoomState = {
        roomId: null,
    }, action: Action
): RoomState => {
    switch(action.type) {
        case ActionType.SetUserAction:
            return produce(state, draftState => {

            })
        case ActionType.SetRoomAction:
            return produce(state, draftState => {

            })
        default:
            return state;
     }
  };