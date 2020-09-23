import produce from "immer";
import { NotificationActionType } from "./actionType";

export enum NotificationType {
    Successs = "SUCCESS",
    Failure = "Failure",
}

export interface NotificationState {
    displayNotification: boolean;
    notificationType: NotificationType;
    notificationHeader: string | JSX.Element;
    notificationBody: string | JSX.Element;
}

const initialState: NotificationState = {
    displayNotification: false,
    notificationType: NotificationType.Successs,
    notificationHeader: "",
    notificationBody: "",
};


export interface ShowSuccessNotification {
    type: NotificationActionType.ShowSuccessNotification;
    header: string | JSX.Element;
    body: string | JSX.Element;
}

export interface ShowErrorNotification {
    type: NotificationActionType.ShowErrorNotification;
    header: string | JSX.Element;
    body: string | JSX.Element;
}

export interface HideNotification {
    type: NotificationActionType.HideNotification;
}

type Action =   ShowSuccessNotification |
                ShowErrorNotification |
                HideNotification;

export const reducer = (
    state: NotificationState = initialState,
    action: Action
): NotificationState => {
    switch (action.type) {
        case NotificationActionType.ShowSuccessNotification:
            return produce(state, draftState => {
                draftState.displayNotification = true;
                draftState.notificationType = NotificationType.Successs;
                draftState.notificationHeader = action.header;
                draftState.notificationBody = action.body;
            });
        case NotificationActionType.ShowErrorNotification:
            return produce(state, draftState => {
                draftState.displayNotification = true;
                draftState.notificationType = NotificationType.Failure;
                draftState.notificationHeader = action.header;
                draftState.notificationBody = action.body;
            });
        case NotificationActionType.HideNotification:
            return produce(state, draftState => {
                draftState.displayNotification = false;
                draftState.notificationHeader = "";
                draftState.notificationBody = "";
            });
        default:
            return state;
    }
}