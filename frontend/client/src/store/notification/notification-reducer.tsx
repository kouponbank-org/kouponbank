import produce from "immer";
import { Alert, AlertType } from "../../api/kb-types";
import { AlertsActionType } from "./action-type";

export interface AlertState {
    alert: Alert;
}

const initialState: AlertState = {
    alert: {
        displayAlert: false,
        alertType: null,
        alertHeader: "",
        alertBody: "",
    },
};

export interface DisplaySuccess {
    type: AlertsActionType.DisplaySuccess;
    header: string | JSX.Element;
    body: string | JSX.Element;
}

export interface DisplayError {
    type: AlertsActionType.DisplayError;
    header: string | JSX.Element;
    body: string | JSX.Element;
}

export interface HideAlert {
    type: AlertsActionType.HideAlert;
}

type Action = DisplaySuccess | DisplayError | HideAlert;

export const reducer = (state: AlertState = initialState, action: Action): AlertState => {
    switch (action.type) {
        case AlertsActionType.DisplaySuccess:
            return produce(state, (draftState) => {
                draftState.alert.displayAlert = true;
                draftState.alert.alertType = AlertType.SUCCESS;
                draftState.alert.alertHeader = action.header;
                draftState.alert.alertBody = action.body;
            });
        case AlertsActionType.DisplayError:
            return produce(state, (draftState) => {
                draftState.alert.displayAlert = true;
                draftState.alert.alertType = AlertType.FAILURE;
                draftState.alert.alertHeader = action.header;
                draftState.alert.alertBody = action.body;
            });
        case AlertsActionType.HideAlert:
            return produce(state, (draftState) => {
                draftState.alert.displayAlert = false;
                draftState.alert.alertHeader = "";
                draftState.alert.alertBody = "";
            });
        default:
            return state;
    }
};
